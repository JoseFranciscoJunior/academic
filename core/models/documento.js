'use strict';

module.exports = function(sequelize, DataTypes){ 
    var documento =sequelize.define('documento',{
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field : 'id'},

        fk_id_diretorio: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false,
            references: {
                model: 'diretorioAcademico',
                key: 'id'
            }},

        titulo: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false},
        
        autor: {
            type: DataTypes.STRING,
            allowNull: true},
        
        caminho: {
            type: DataTypes.STRING,
            allowNull: false},
        
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true}
    }, {
        freezeTableName: true
    });

    return documento;
}
