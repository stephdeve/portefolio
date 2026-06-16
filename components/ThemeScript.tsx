// Inline, render-blocking script that applies the saved theme before paint,
// preventing a flash of the wrong theme. `storageKey` differs between the
// public site ("theme") and the admin area ("admin-theme"), matching the
// original PHP behaviour.
export function ThemeScript({ storageKey = 'theme' }: { storageKey?: string }) {
  const code = `(function(){try{
    var key=${JSON.stringify(storageKey)};
    var theme=localStorage.getItem(key);
    var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(theme==='dark'||(!theme&&prefersDark)){document.documentElement.classList.add('dark');}
    else{document.documentElement.classList.remove('dark');}
  }catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
