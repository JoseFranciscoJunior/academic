'use strict';

module.exports = function(sequelize, DataTypes){ 
    var usuario = sequelize.define('usuario', {
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field : 'id'},

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true},
        
        senha: {
            type: DataTypes.STRING,
            allowNull: false},
        
        confirmaSenha: {
            type: DataTypes.STRING,
            allowNull: false},
        
        nome: {
            type: DataTypes.STRING,
            allowNull: true},
        
        CPF: {
            type: DataTypes.STRING,
            allowNull: false},
        
        funcaoID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'funcao',
                key: 'id'
            }},

        fk_id_diretorio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'diretorioAcademico',
                key: 'id'
            }},
        
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false}
    }, {
        tableName: 'usuario',
        freezeTableName: true
    });

    usuario.associate = function(models) {
        usuario.belongsTo(models.funcao, {
            as: 'funcoes',
            foreignKey: 'funcaoID',
            constraints: false
        });
    }
    return usuario;
}
