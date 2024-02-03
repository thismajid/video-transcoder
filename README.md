# Video Transcoder

Video Transcoder is an Express.js application designed to provide an easy-to-use API for video transcoding tasks. It leverages the power of FFmpeg for video processing, Redis for caching and job data persistence, and BullMQ for robust queue management of transcoding jobs.

## Features

- **API Endpoint for Transcoding**: Submit video transcoding jobs via a simple REST API.
- **FFmpeg Integration**: Utilizes FFmpeg for efficient and high-quality video transcoding.
- **Job Queue**: Implements BullMQ for managing and processing transcoding jobs asynchronously.
- **Redis Backend**: Uses Redis for storing job data and result caching for performance optimization.

### Prerequisites

- Node.js (LTS version recommended)
- Redis server running

### Installation

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/thismajid/video-transcoder.git
cd video-transcoder
npm install
npm run start:dev
```
