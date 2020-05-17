let Endereco = (sequelize, DataTypes) => {
    let endereco = sequelize.define(
        'Endereco',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            estado: {
                type: DataTypes.CHAR(2),
                allowNull: false
            },
            cidade: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cep: {
                type: DataTypes.CHAR(8),
                allowNull: false
            },
            logradouro: {
                type: DataTypes.STRING,
                allowNull: false
            },
            numeral: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            complemento: {
                type: DataTypes.STRING,
            },
            usuarios_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            tableName: 'enderecos',
            timestamps: false
        }
    )

    endereco.associate = models => {
        endereco.belongsTo(models.Usuario, { foreignKey: 'usuarios_id', as: 'usuario' });
        endereco.hasMany(models.Pedido, { foreignKey: 'enderecos_id', as: 'pedidos' });
    }

    return endereco;

}

module.exports = Endereco;