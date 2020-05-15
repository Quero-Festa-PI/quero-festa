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

    return categoria;

}

module.exports = Categoria;