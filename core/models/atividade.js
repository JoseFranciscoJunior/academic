'use strict';

module.exports = function(sequelize, DataTypes){ 
    var atividade = sequelize.define('atividade', {
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field : 'id'},

        responsavel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuario',
                key: 'id'}},
        
        nome: {
            type: DataTypes.STRING,
            allowNull: true}
    }, {
        freezeTableName: true
    });

    return atividade;
}
