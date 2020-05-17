let Pedido = (sequelize, DataTypes) => {
    let pedido = sequelize.define(
        'Pedido',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            usuarios_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            lojas_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            enderecos_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            pagamentos_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            entregas_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            valor_total: {
                type: DataTypes.FLOAT.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: 'pedidos',
            timestamps: true
        }
    )

    pedido.associate = models => {
        pedido.belongsTo(models.Usuario, { foreignKey: 'usuarios_id', as: 'usuario' });
        pedido.belongsTo(models.Loja, { foreignKey: 'lojas_id', as: 'loja' });
        pedido.belongsTo(models.Endereco, { foreignKey: 'enderecos_id', as: 'endereco' });
        pedido.belongsTo(models.Entrega, { foreignKey: 'entregas_id', as: 'entrega' });
        pedido.belongsTo(models.Pagamento, { foreignKey: 'pagamentos_id', as: 'pagamento' });
    }

    return pedido;

}

module.exports = Pedido;