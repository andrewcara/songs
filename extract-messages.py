import sqlite3
import pandas as pd
import datetime as datetime
import numpy as np
from urllib import parse

conn = sqlite3.connect('/Users/andrewcaravaggio/Library/Messages/chat.db')
cur = conn.cursor()
cur.execute(" select name from sqlite_master where type = 'table' ") 


messages = pd.read_sql_query('''select ROWID, text, date, handle_id, datetime(date/1000000000 + strftime("%s", "2001-01-01") ,"unixepoch","localtime")  as date_utc FROM message''', conn) 
messages.rename(columns={'ROWID' : 'message_id'}, inplace = True)

handles = pd.read_sql_query("select ROWID, id from handle", conn)
handles.rename(columns={'id' : 'phone_number', 'ROWID': 'handle_id'}, inplace = True)

messagesAndHandlesJoined = pd.merge(messages, handles, on ='handle_id',  how='left')

chatMessagesJoined = pd.read_sql_query("select chat_id, message_id from chat_message_join", conn)

chatMessagesAndHandlesJoined = pd.merge(messagesAndHandlesJoined, chatMessagesJoined, on = 'message_id', how='left')

houseMusicChat = chatMessagesAndHandlesJoined[chatMessagesAndHandlesJoined['chat_id'] == 18]
print(houseMusicChat.to_string())
houseMusicChat = houseMusicChat[['text', 'date_utc']]


spotifyTrackText = 'https://open.spotify.com/track/'
houseMusicChat = houseMusicChat[houseMusicChat['text'].str.startswith(spotifyTrackText) == True]

trackIDs = []

for url in houseMusicChat['text'].to_numpy():
    path = parse.urlparse(url).path
    trackIDs.append(path.rpartition('/')[2])

trackIdsWithoutDuplicates = sam_list = list(set(trackIDs)) 

np.savetxt(r'/Users/andrewcaravaggio/track_ids.txt', trackIdsWithoutDuplicates, fmt='%s', delimiter=',')
