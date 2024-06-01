package <%= basePackageName %>.album.data.datasource.database

import androidx.room.Database
import androidx.room.RoomDatabase
import <%= basePackageName %>.album.data.datasource.database.model.AlbumEntityModel

@Database(entities = [AlbumEntityModel::class], version = 1, exportSchema = false)
internal abstract class AlbumDatabase : RoomDatabase() {

    abstract fun albums(): AlbumDao
}
