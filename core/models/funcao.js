'use strict';

module.exports = function(sequelize, DataTypes){ 
    var funcao =sequelize.define('funcao',{
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field : 'id'},

        nome: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true},
    }, {
        freezeTableName: true
    });

    funcao.associate = function(models) {
        funcao.hasMany(models.usuario, {
            foreignKey: 'id',
            constraints: false
        });
    }
    return funcao;
}
