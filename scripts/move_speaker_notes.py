import os
import shutil

def move_city_index_speaker():
    source_path = os.path.join('city', 'index-speaker.html')
    destination_path = os.path.join('docs', 'city', 'index-speaker.html')
    
    # Check if the file exists before moving
    if os.path.exists(source_path):
        # Create destination directory if it doesn't exist
        os.makedirs(os.path.dirname(destination_path), exist_ok=True)
        
        # Move the file
        shutil.move(source_path, destination_path)
        print(f"File moved from {source_path} to {destination_path}")
    else:
        print(f"Source file {source_path} does not exist. No action taken.")

move_city_index_speaker()
