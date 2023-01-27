import spotipy


class Spotiy:

    #An instance of the class contains a connection and the user_id. All subsequent API calls can be made using these attributes and a playlist id
    
    def __init__(self):
        auth_manager= spotipy.oauth2.SpotifyOAuth(scope="playlist-modify-public",
                                                cache_path = '/Users/andrewcaravaggio/SideProjects/songs/.cache',
                                                show_dialog=True)

        self.conn = spotipy.Spotify(auth_manager=auth_manager) #

        self.user_id = self.conn.current_user()['id']
    
    
    
    
    #method that creates a playlist
    #The user can pass it a name and a description
    
    def create_playlist(self, user_id, name, description):   

        response = self.conn.user_playlist_create(user_id, name= name, public=True, collaborative=False, description= description)
        
        if response['id']:
            return response['id']
        else:
            return('error something went wrong')
    
    
    #Updates playlist method
    def update_playlist(self, playlist_id, tracks):
        
        response = self.conn.playlist_add_items(playlist_id, tracks, position=None)



    #Delete playlist

    def delete_playlist(self, playlist_id):
        
        response = self.conn.current_user_unfollow_playlist(playlist_id)
        return response

# spot = Spotiy()

# #output = spot.create_playlist(spot.user_id, 'new playlist', 'creating a new playlist')

# output = spot.delete_playlist('3dJEOULxyXEyDhHZD25W8E')
# print(output)