let ImagensDeProduto = (sequelize, DataTypes) => {
    let imagensDeProduto = sequelize.define(
        'ImagensDeProduto',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            produtos_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: 'imagensDeProduto',
            timestamps: false
        }
    )

    imagensDeProduto.associate = models => {
        imagensDeProduto.belongsTo(models.Produto, { foreignKey: 'produtos_id', as: 'produtos' });
    }

    return imagensDeProduto;

}

module.exports = ImagensDeProduto;