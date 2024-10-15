import os
import shutil

def move_city_index_speaker():
    source_path = os.path.join('city', 'index-speaker.html')
    destination_path = os.path.join('docs', 'city', 'index-speaker.html')
        
    # Move the file
    shutil.move(source_path, destination_path)
    
    print(f"File moved from {source_path} to {destination_path}")

move_city_index_speaker()
