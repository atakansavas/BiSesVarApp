var DbCommands = function () {
    var dbName = "dbSesVar";
    var favTableName = "PRM_Favorites";
    var infTableName = "PRM_Infos";
    var _db;
    var _status;

    return {
        ClearDatabase: function () {
            _db = window.openDatabase(dbName, "1.0", "Bisesvar Info Db", 2 * 1024 * 1024);

            _db.transaction(function (tx) {
                tx.executeSql('DROP TABLE ' + infTableName);
            });
        },

        CreateDatabase: function () {
            _db = window.openDatabase(dbName, "1.0", "Bisesvar Info Db", 2 * 1024 * 1024);

            _db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS ' + infTableName + ' (title TEXT, status TEXT, ndx int)');
            });
        },

        GetFavoriteList: function () {

        },

        AddToFavorites: function () {

        },

        GetInfo: function (ndx, callback) {
            //Ndx listesi;
            //1 = uygulamanın ilk kez açılıp açılmadığını gösterir.
            var query = 'SELECT * FROM ' + infTableName + ' WHERE ndx = ' + ndx;
            var rowCount, result = "";

            _db.transaction(function (tx) {
                tx.executeSql(query, [], function (tx, results) {
                    rowCount = results.rows.length;
                    if (rowCount > 0) {
                        result = results.rows.item(0)['status'];
                    }

                    if (typeof (callback) == 'function') {
                        callback(
                            {
                                count: rowCount,
                                innerData: result
                            });
                    }
                }, function (error) {
                    UtilityCommands.ShowError();
                });
            });
        },

        SetInfo: function (title, value, ndx, callback) {

            DbCommands.GetInfo(ndx, function (data) {
                if (data.count == 0) {
                    //Data yoksa insert ediilir.
                    var query = 'INSERT INTO ' + infTableName + ' (title,status,ndx) VALUES ("' + title + '","' + value + '",' + ndx + ')';

                    _db.transaction(function (tx) {
                        tx.executeSql(query, [], function () {
                            if (typeof (callback) == 'function') {
                                callback(true);
                            }
                        }, function () {
                            if (typeof (callback) == 'function') {
                                callback(false);
                            }
                        });
                    });
                }
                else {
                    //Data varsa update edilir
                    var query = 'UPDATE ' + infTableName + ' SET title = "' + title + '", status = "' + value + '" WHERE NDX = ' + ndx + '';

                    _db.transaction(function (tx) {
                        tx.executeSql(query, [], function () {
                            if (typeof (callback) == 'function') {
                                callback(true);
                            }
                        }, function () {
                            if (typeof (callback) == 'function') {
                                callback(false);
                            }
                        });
                    });
                }
            });

         
        },

        IfExistInFavorite: function () {

        },

        Init: function () {
            DbCommands.CreateDatabase();
        },
    };
}();


$(document).on("pageshow", function () {
    UtilityCommands.Init();

    var currentPage = window.location.pathname.replace("/", "").replace(".html", "").toLowerCase();
    console.log("Aktif sayfa : " + currentPage);


});
