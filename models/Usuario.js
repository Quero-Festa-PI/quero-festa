let Usuario = (sequelize, DataTypes) => {
    let usuario = sequelize.define(
        'Usuario',
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
            },
            sobrenome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            senha: {
                type: DataTypes.CHAR(256),
                allowNull: false
            },
            cpf: {
                type: DataTypes.CHAR(11),
                unique: true
            },
            data_nasc: {
                type: DataTypes.DATE,
            },
            sexo: {
                type: DataTypes.ENUM('M', 'F'),
                defaultValue: null
            },
            imagem: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'usuarios',
            timestamps: false
        }
    )

    usuario.associate = models => {
        usuario.hasOne(models.Loja, { foreignKey: 'id', as: 'lojas' })
        usuario.hasMany(models.Endereco, { foreignKey: 'usuarios_id', as: 'enderecos' });
        usuario.hasMany(models.Pedido, { foreignKey: 'usuarios_id', as: 'pedidos' })
    }

    return usuario;

}

module.exports = Usuario;