let AvaliacoesDeProdutos = (sequelize, DataTypes) => {
    let avaliacoesDeProdutos = sequelize.define(
        'AvaliacoesDeProdutos',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            produtos_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            usuarios_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            classificacao: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            comentario: {
                type: DataTypes.STRING(75),
            },
        },
        {
            tableName: 'avaliacoesDeProdutos',
            timestamps: true,
        }
    )

    avaliacoesDeProdutos.associate = models => {
        avaliacoesDeProdutos.belongsTo(models.Produto, { foreignKey: 'produtos_id', as: 'produtos' });
        avaliacoesDeProdutos.belongsTo(models.Usuario, { foreignKey: 'usuarios_id', as: 'usuarios' });
    }

    return avaliacoesDeProdutos;

}

module.exports = AvaliacoesDeProdutos;