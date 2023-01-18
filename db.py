import sqlite3
import time

def createConnection():

    connection = sqlite3.connect("/Users/andrewcaravaggio/SideProjects/songs/AutoSpoto")
    connection.row_factory = sqlite3.Row
    return connection

def createTable(connection):

    connection.cursor().execute("CREATE TABLE playlists (chat_id INTEGER, playlist_id TEXT, last_updated TEXT)")

#When a playlist is created we keep track of current time so we do not upload songs that have already been uploaded at an earlier date

def addPlaylist(connection, chat_id, playlist_id):
    connection.cursor().execute("INSERT into playlists VALUES (?, ?, DateTime('now','localtime') )", (chat_id, playlist_id))
    connection.commit()

#For the same reason we need to update the row when songs have been uploaded to spotify    
def updateTimePlaylist(connection, playlist_id):
    connection.cursor().execute("UPDATE playlists set last_updated = ? WHERE playlist_id = ?", (time.strftime("%Y-%m-%d %H:%M:%S"), playlist_id))
    connection.commit()

def deletePlaylist(connection, playlist_id):
    connection.cursor().execute("DELETE from playlists WHERE playlist_id =?", (playlist_id,))
    connection.commit()



