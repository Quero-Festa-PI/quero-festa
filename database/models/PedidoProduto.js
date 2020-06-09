let PedidoProduto = (sequelize, DataTypes) => {
    let pedidoProduto = sequelize.define(
        'PedidoProduto',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            pedidos_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            produtos_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            quantidade: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: 'pedido_produtos',
            timestamps: false
        }
    )

    pedidoProduto.associate = models => {
        pedidoProduto.belongsTo(models.Pedido, { foreignKey: 'pedidos_id', as: 'pedidos' });
        pedidoProduto.belongsTo(models.Produto, { foreignKey: 'produtos_id', as: 'produtos' });
    }

    return pedidoProduto;

}

module.exports = PedidoProduto;