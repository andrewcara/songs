import sqlite3
import time



def createConnection():

    connection = sqlite3.connect("AutoSpoto")

    return connection

def createTable(connection):

    connection.cursor().execute("CREATE TABLE playlists (chat_id INTEGER, playlist_id TEXT, last_updated TEXT)")


def addPlaylist(connection, chat_id, playlist_id):
    connection.cursor().execute("INSERT into playlists VALUES (?, ?, DateTime('now','localtime') )", (chat_id, playlist_id))
    connection.commit()
    
def updatePlaylist(connection, playlist_id):
    connection.cursor().execute("UPDATE playlists set last_updated = ? WHERE playlist_id = ?", (time.strftime("%Y-%m-%d %H:%M:%S"), playlist_id))
    connection.commit()


conn = createConnection()
#addPlaylist(conn, 13, 'aaab')
updatePlaylist(conn, 'aaab')
row = conn.cursor().execute("Select * From playlists")
print(row.fetchall())


