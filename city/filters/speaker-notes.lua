function copy_file()
    local source_file = '/Users/calcei01/Projects/libraries/ddj-wiki/city/index-speaker.html'
    local destination_dir = '/Users/calcei01/Projects/libraries/ddj-wiki/docs/city/'
    local destination_file = destination_dir .. 'index-speaker.html'
    
    -- Create the destination directory if it doesn't exist
    os.execute('mkdir -p ' .. destination_dir)
    
    -- Then copy the file
    os.execute('cp ' .. source_file .. ' ' .. destination_file)
end

copy_file()
