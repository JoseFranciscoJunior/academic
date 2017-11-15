module.exports = function(sequelize, DataTypes){ 
    var cursoFaculdade = sequelize.define('cursoFaculdade', {
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field : 'id'},

        fk_id_curso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'curso',
                key: 'id'}},

        fk_id_faculdade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'faculdade',
                key: 'id'}},
    }, {
        tableName: 'cursoFaculdade',
        freezeTableName: true
    });

    cursoFaculdade.associate = function(models) {
        cursoFaculdade.hasMany(models.diretorioAcademico, {
            foreignKey: 'id',
            constraints: false
        });
    }

    return cursoFaculdade;
}
