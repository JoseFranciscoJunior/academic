'use strict';

module.exports = function(sequelize, DataTypes){ 
    const Faculdade = sequelize.define('faculdade',{
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

        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true},
        
        telefone: {
            type: DataTypes.STRING,
            allowNull: false}
    }, {
        tableName: 'faculdade',
        freezeTableName: true
    });

    Faculdade.associate = function(models) {
        Faculdade.belongsToMany(models.curso, {
            through: models.cursoFaculdade,
            foreignKey: 'fk_id_faculdade',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    return Faculdade;
}
