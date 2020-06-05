let Produto = (sequelize, DataTypes) => {
    let produto = sequelize.define(
        'Produto',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            lojas_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            valor: {
                type: DataTypes.FLOAT.UNSIGNED,
                allowNull: false
            },
            disponibilidade: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            descricao: {
                type: DataTypes.STRING
            },
            avaliacao: {
                type: DataTypes.FLOAT
            }
        },
        {
            tableName: 'produtos',
            timestamps: false
        }
    )

    produto.associate = models => {
        produto.belongsTo(models.Loja, { foreignKey: 'lojas_id', as: 'lojas' });
        produto.hasMany(models.ImagensDeProduto, { foreignKey: 'produtos_id', as: 'imagens' })
        produto.belongsToMany(models.Categoria,
            {
                through: 'produtos_categorias',
                as: 'categorias',
                foreignKey: 'produtos_id'
            });
        produto.belongsToMany(models.Pedido,
            {
                through: 'pedido_produtos',
                as: 'pedidos',
                foreignKey: 'produtos_id'
            });
    }

    return produto;

}

module.exports = Produto;