let Entrega = (sequelize, DataTypes) => {
    let entrega = sequelize.define(
        'Entrega',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            data_prev: {
                type: DataTypes.DATE,
            },
            data_real: {
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'entregas',
            timestamps: false
        }
    )

    return entrega;

}

module.exports = Entrega;