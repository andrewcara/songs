#!/Library/Frameworks/Python.framework/Versions/3.11/bin/python3
import extract_script #import the script that accesses the chat.db
import db
import spotify_apis

import spotipy
from spotipy.oauth2 import SpotifyOAuth
import csv


#instatiate spotify class
spot = spotify_apis.Spotiy()

################################################ This section of the code will be updated to access the stored values from swift

#Right now we are using an sqlite3 db with hardcoded records to simulate the real action
conn = db.db() #connection to the databse

row = conn.connection.cursor().execute("Select * From Playlists") #Query the database for records
row = row.fetchone()

playlist_id = row['playlist_id']
chat_id = row['chat_id']
last_updated = row['last_updated']

################################################


tracks = extract_script.get_songs(10,last_updated) #calling the getSongs function from the extract_script module

if tracks: #if the getSongs function returns none it means that no new songs have been sent in the chat
    for index, row in enumerate(tracks): 
        tracks[index] = ('spotify:track:'+row) #append spotify:track to each of the track ids for the spotify api

    spot.update_playlist(playlist_id, tracks) #Spotipy api that posts songs to a playlist


    conn.updateTimePlaylist(playlist_id) #Updates DB with current time of posting to playlist

else:
    print('no new songs')
    print(last_updated)