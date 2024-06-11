export class UtilsFiles {
  static downloadFile(fileContent: string, name: string, fileExtension: string) {
    const byteCharacters = atob(fileContent);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([ byteArray ], { type: 'application/octet-stream' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name + fileExtension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
