# Build on Windows with Codemagic

1. Upload this folder to GitHub.
2. In Codemagic, add the GitHub repository.
3. Select `codemagic.yaml` as the workflow configuration.
4. Start the `ios-demo-ipa` workflow.
5. Download `SA-Digital-Wallet-Demo-unsigned.ipa` from Artifacts.

This workflow intentionally creates an **unsigned** IPA. It is suitable as a build artifact, but an unsigned IPA cannot be normally installed on a physical iPhone. A signed/distributable iOS app requires Apple Developer signing credentials and a provisioning profile.

This project is an unofficial demonstration and must not be presented as an official government credential.
