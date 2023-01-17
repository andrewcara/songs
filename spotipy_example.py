#!/Library/Frameworks/Python.framework/Versions/3.11/bin/python3
import extract_script #import the script that accesses the db
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import csv
scope = "playlist-modify-public"
#calls the extract-script script which reads the chat.db and updates the txt file

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope)) #use the spotipy library to authenticate the user

# text_file = open("track_ids.txt", "r")
# lines = text_file.read().split(',')
tracks = extract_script.getSongs()

for index, row in enumerate(tracks):
    tracks[index] = ('spotify:track:'+row)

sp.playlist_add_items('0FzCYXYslENxz2RsDDkwu4', tracks, position=None)



