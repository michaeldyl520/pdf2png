# PDF to PNG Converter

A cross-platform desktop application for converting PDF files to PNG images.

## Features

- **PDF to PNG Conversion**: Convert each page of a PDF to a separate PNG image
- **Custom Output Folder**: Choose where to save the converted images
- **Multi-language Support**: Auto-detects system language (English/Chinese)
- **Manual Language Switch**: Toggle between English and Chinese via button
- **Modern UI**: Gradient design with progress bar

## Supported Platforms

- **Linux**: DEB, RPM packages
- **Windows**: Standalone executable (requires WebView2 runtime)

## Tech Stack

- **Tauri 2.x**: Rust-based desktop framework
- **PDF.js**: PDF rendering in browser
- **WebView**: Frontend display
- **Plugins**: dialog (folder selection), fs (file saving)

## Build from Source

### Prerequisites

- Node.js 18+
- Rust 1.70+
- Cargo

### Linux Build

```bash
cd src-tauri
npx tauri build
```

### Windows Cross-Compile (on Linux)

```bash
rustup target add x86_64-pc-windows-gnu
cd src-tauri
cargo build --release --target x86_64-pc-windows-gnu
```

## Usage

1. Launch the application
2. Drag & drop a PDF file or click to select
3. Click "Select Output Folder" to choose destination
4. Click "Convert All Pages to PNG"
5. Check output folder for converted images

## Keyboard Shortcuts

- Language toggle: Click "EN/中文" button in top-right corner

## License

MIT