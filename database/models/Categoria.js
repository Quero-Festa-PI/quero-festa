let Categoria = (sequelize, DataTypes) => {
    let categoria = sequelize.define(
        'Categoria',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'categorias',
            timestamps: false
        }
    )

    categoria.associate = models => {
        categoria.belongsToMany(models.Produto,
            {
                through: 'produtos_categorias',
                as: 'produtos',
                foreignKey: 'categorias_id'
            })
    }

    return categoria;

}

module.exports = Categoria;