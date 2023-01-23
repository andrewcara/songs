#!/Library/Frameworks/Python.framework/Versions/3.11/bin/python3
import extract_script #import the script that accesses the chat.db
import db
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import csv
scope = "playlist-modify-public"

auth_manager= spotipy.oauth2.SpotifyOAuth(scope=scope,
                                               cache_path = '/Users/andrewcaravaggio/SideProjects/songs/.cache',
                                               show_dialog=True)

sp = spotipy.Spotify(auth_manager=auth_manager) #use the spotipy library to authenticate the user


conn = db.createConnection() #connection to the databse

row = conn.cursor().execute("Select * From Playlists") #Query the database for records
row = row.fetchone()

playlist_id = row['playlist_id']
chat_id = row['chat_id']
last_updated = row['last_updated']



tracks = extract_script.getSongs(chat_id,last_updated) #calling the getSongs function from the extract_script module

if tracks: #if the getSongs function returns none it means that no new songs have been sent in the chat
    for index, row in enumerate(tracks): 
        tracks[index] = ('spotify:track:'+row) #append spotify:track to each of the track ids for the spotify api

    sp.playlist_add_items(playlist_id, tracks, position=None) #Spotipy api that posts songs to a playlist


    db.updateTimePlaylist(conn, playlist_id) #Updates DB with current time of posting to playlist

else:
    print('no new songs')
    print(last_updated)