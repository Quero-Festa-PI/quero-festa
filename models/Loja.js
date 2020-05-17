let Loja = (sequelize, DataTypes) => {
    let loja = sequelize.define(
        'Loja',
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
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descricao: {
                type: DataTypes.STRING
            },
            avaliacao: {
                type: DataTypes.FLOAT
            }
        },
        {
            tableName: 'lojas',
            timestamps: false
        }
    )

    loja.associate = models => {
        loja.belongsTo(models.Usuario, { foreignKey: 'usuarios_id', as: 'usuario' })
        loja.hasMany(models.Produto, { foreignKey: 'lojas_id', as: 'produtos' })
    }

    return loja;

}

module.exports = Loja;