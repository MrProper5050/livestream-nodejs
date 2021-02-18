module.exports = {
    server: {
        jwt_secret: 'kjVkutawawdxdAwayFdd3JGCawdwadwawSwdZTkda0dawM5Jhawd9mgQWdawd4rytXcdddd',
        port : 3333
    },
    rtmp_server: {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 2,
            ping_timeout: 2

        },
        http: {
            port: 8888,
            mediaroot: './server/media',
            allow_origin: '*'
        },
        trans: {
            ffmpeg: 'C:/ffmpeg/ffmpeg/bin/ffmpeg.exe',
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
                    
                }
            ]
        }
    }

}