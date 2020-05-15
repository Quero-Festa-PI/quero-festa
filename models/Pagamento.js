let Pagamento = (sequelize, DataTypes) => {
    let pagamento = sequelize.define(
        'Pagamento',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            forma_pagamento: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Pendente',
            }
        },
        {
            tableName: 'pagamentos',
            timestamps: false
        }
    )

    return pagamento;

}

module.exports = Pagamento;