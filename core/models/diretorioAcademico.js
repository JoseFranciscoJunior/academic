'use strict';

module.exports = function(sequelize, DataTypes){ 
    var diretorioAcademico = sequelize.define('diretorioAcademico',{
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field : 'id'},

        fk_id_cursoFaculdade: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false,
            references: {
                model: 'cursoFaculdade',
                key: 'id'
            }},

        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false},
        
        CNPJ: {
            type: DataTypes.STRING,
            allowNull: false},
        
        caminhoFoto: {
            type: DataTypes.STRING,
            allowNull: true}
    }, {
        freezeTableName: true
    });

    diretorioAcademico.associate = function(models) {
        diretorioAcademico.belongsTo(models.cursoFaculdade, {
            as: 'cursofaculdade',
            foreignKey: 'fk_id_cursoFaculdade',
            constraints: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    return diretorioAcademico;
}
