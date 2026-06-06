# AGENTS.md

## Build Commands

```bash
# Build Tauri app (from project root or src-tauri)
npm run build          # alias for tauri build
cd src-tauri && npx tauri build

# Development (runs from dist/, not src/)
npm run dev            # alias for tauri dev
```

**Note**: `frontendDist` is `../dist` (not `../src`). The `dist/` folder is the built frontend. Source is `index.html` at project root.

## Architecture

- **Framework**: Tauri 2.x (Rust backend + WebView frontend)
- **Frontend**: Vanilla HTML/JS, no bundler. PDF.js for rendering.
- **Rust command**: `save_png(path: String, data: Vec<u8>)` in `src-tauri/src/main.rs`
- **i18n**: Built-in language toggle (EN/中文) in `dist/index.html`

## Key File Locations

| File | Purpose |
|------|---------|
| `index.html` | Dev source (lives at project root) |
| `dist/index.html` | Built frontend (tauri.conf.json: `frontendDist: ../dist`) |
| `src/main.js` | Alternative JS entry, calls `convert_pdf_to_png` (outdated) |
| `src-tauri/src/main.rs` | Rust backend with `save_png` command |
| `src-tauri/tauri.conf.json` | Tauri config (window size 800x600, devtools enabled) |
| `js/` | PDF.js library files (pdf.min.js, pdf.worker.min.js) |

## Common Mistakes

- **Building from wrong directory**: Always `cd src-tauri` before `cargo` or `tauri` commands
- **Editing dist/ instead of root index.html**: `dist/` is overwritten on build. Edit `index.html` at project root.
- **Missing Rust toolchain**: Run `rustup target add x86_64-pc-windows-gnu` before Windows cross-compile

## Windows Cross-Compile (on Linux)

```bash
rustup target add x86_64-pc-windows-gnu
cd src-tauri
cargo build --release --target x86_64-pc-windows-gnu
```

## Release Process

### Version Update
Update version in `src-tauri/tauri.conf.json` before building:
```json
"version": "1.0.5"
```

### Build Packages
```bash
# Linux packages (deb, rpm)
npm run build

# Windows exe (cross-compile on Linux)
npx tauri build --target x86_64-pc-windows-gnu
```

**Note**: NSIS installer (`-setup.exe`) requires Windows host. On Linux, only `.exe` is produced.

### Publish to GitHub
```bash
# Create release with packages
gh release create v1.0.5 --title "v1.0.5" --notes "release notes" \
  src-tauri/target/release/bundle/deb/pdf2png_1.0.5_amd64.deb \
  src-tauri/target/release/bundle/rpm/pdf2png-1.0.5-1.x86_64.rpm

# Upload Windows exe separately
gh release upload v1.0.5 src-tauri/target/x86_64-pc-windows-gnu/release/pdf2png.exe
```

### Build Output Locations
| Platform | Path |
|----------|------|
| Linux deb | `src-tauri/target/release/bundle/deb/*.deb` |
| Linux rpm | `src-tauri/target/release/bundle/rpm/*.rpm` |
| Windows exe | `src-tauri/target/x86_64-pc-windows-gnu/release/pdf2png.exe` |