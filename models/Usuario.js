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
                allowNull: false,
                unique: true
            },
            data_nasc: {
                type: DataTypes.DATE,
                allowNull: false
            },
            sexo: {
                type: DataTypes.ENUM('M', 'F'),
                allowNull: false
            },
        },
        {
            tableName: 'usuarios',
            timestamps: false
        }
    )

    usuario.associate = models => {
        usuario.hasOne(models.Loja, { foreignKey: 'id', as: 'lojas' })
        usuario.hasMany(models.Endereco, { foreignKey: 'usuarios_id', as: 'enderecos' });
    }

    return usuario;

}

module.exports = Usuario;