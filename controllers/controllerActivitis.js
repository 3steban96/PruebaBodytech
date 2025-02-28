const pool = require('../DB/DBConnect');

async function registerActivities(req, res) {
    const { id } = req.params; // ID del usuario
    const { action, activityPercentageMonth } = req.body; // Acción realizada y porcentaje de actividad

    if (!id || !action) {
        return res.status(400).json({ error: 'ID del usuario y acción son obligatorios' });
    }

    try {
        // Insertar en la tabla activities
        const insertActivityQuery = `INSERT INTO activities (user_id, action, timestamp) VALUES (?, ?, NOW());`;
        await pool.query(insertActivityQuery, [id, action]);

        // Insertar o actualizar en la tabla activity_counts
        const updateActivityCountQuery = `
            INSERT INTO activity_counts (user_id, action, count, updated_at)
            VALUES (?, ?, 1, NOW())
            ON DUPLICATE KEY UPDATE count = count + 1, updated_at = NOW();
        `;
        await pool.query(updateActivityCountQuery, [id, action]);

        // Obtener el mes actual en español
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const currentMonth = monthNames[new Date().getMonth()]; // Obtener el nombre del mes actual

        // Validar si se recibió un porcentaje válido
        const activityPercentage = activityPercentageMonth !== undefined ? activityPercentageMonth : 0;

        // Insertar o actualizar en activity_months
        const updateActivityMonthQuery = `
            INSERT INTO activity_months (user_id, month, activityPercentage)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE activityPercentage = (activityPercentage + VALUES(activityPercentage)) / 2;
        `;
        await pool.query(updateActivityMonthQuery, [id, currentMonth, activityPercentage]);

        // **JSON de respuesta**
        const response = {
            message: 'Actividad registrada exitosamente',
            user_id: id,
            action: action,
            month: currentMonth,
            activityPercentage: activityPercentage
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Error al registrar actividad:', error);
        res.status(500).json({ error: 'Error al registrar actividad' });
    }
}

module.exports = { registerActivities };

