const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-sm">
              Jogo educativo sobre ligas metálicas. Aprenda enquanto se diverte!
            </p>
          </div>
          <div className="text-xs mt-2 md:mt-0">
            <p className="text-slate-400">© 2024 Ligas Metálicas <span className="text-[8px] align-super">num pode ™</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
