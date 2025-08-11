import React, { useState, useEffect, useRef } from "react";
import {
  Moon,
  Sun,
  Copy,
  Check,
  Calculator as CalcIcon,
  Github,
} from "lucide-react";
import { ThemeProvider, useTheme } from "./Theme";
import { translations, detectLanguage } from "./translations";
import {
  calculateAutomationWorth,
  loadUrlParams,
  generateShareUrl,
  copyToClipboard,
} from "./utils";

const CalculatorContent = () => {
  const { theme, toggleTheme, getThemeClasses } = useTheme();
  const [language, setLanguage] = useState("en");
  const [automationTime, setAutomationTime] = useState("");
  const [manualTime, setManualTime] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Refs for input navigation
  const automationRef = useRef(null);
  const manualRef = useRef(null);
  const repetitionsRef = useRef(null);

  const classes = getThemeClasses();
  const t = translations[language];

  // Initialize language and load URL params
  useEffect(() => {
    setLanguage(detectLanguage());

    const params = loadUrlParams();
    if (params.automationTime && params.manualTime && params.repetitions) {
      setAutomationTime(params.automationTime);
      setManualTime(params.manualTime);
      setRepetitions(params.repetitions);

      const calculatedResult = calculateAutomationWorth(
        parseFloat(params.automationTime),
        parseFloat(params.manualTime),
        parseInt(params.repetitions)
      );
      setResult(calculatedResult);
    }
  }, []);

  // Auto-calculate when inputs change
  useEffect(() => {
    if (automationTime && manualTime && repetitions) {
      const calculatedResult = calculateAutomationWorth(
        parseFloat(automationTime),
        parseFloat(manualTime),
        parseInt(repetitions)
      );
      setResult(calculatedResult);
    } else {
      setResult(null);
    }
  }, [automationTime, manualTime, repetitions]);

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleShare = async () => {
    const url = generateShareUrl(automationTime, manualTime, repetitions);
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // const isFormValid = automationTime && manualTime && repetitions;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${classes.background}`}
    >
      {/* Header */}
      <div
        className={`border-b transition-colors duration-300 ${classes.headerBorder}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CalcIcon size={20} className={classes.icon} />
            <span className="font-medium text-lg">{t.title}</span>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 transition-all duration-300 hover:scale-105 ${classes.themeToggle}`}
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${classes.heroTitle}`}>
            {t.heroTitle}
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${classes.subtitle}`}
          >
            {t.heroSubtitle}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`border transition-all duration-300 overflow-hidden ${classes.card}`}
          >
            {/* Formula Section */}
            <div className={`p-6 border-b ${classes.formulaSection}`}>
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-4">{t.formulaTitle}</h2>
                <div className={`inline-block text-left ${classes.formula}`}>
                  {t.formula}
                </div>
              </div>
            </div>

            {/* Input/Output Grid */}
            <div className="grid md:grid-cols-2 min-h-[400px]">
              {/* Left Panel - Inputs */}
              <div className={`p-8 border-r ${classes.inputPanel}`}>
                <h3 className="text-lg font-semibold mb-6">{t.inputTitle}</h3>

                <div className="space-y-6">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${classes.label}`}
                    >
                      {t.automationLabel}
                    </label>
                    <input
                      ref={automationRef}
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="60"
                      value={automationTime}
                      onChange={(e) => setAutomationTime(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, manualRef)}
                      className={`w-full px-4 py-3 border transition-all duration-300 focus:outline-none focus:ring-2 ${classes.input}`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${classes.label}`}
                    >
                      {t.manualLabel}
                    </label>
                    <input
                      ref={manualRef}
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="5"
                      value={manualTime}
                      onChange={(e) => setManualTime(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, repetitionsRef)}
                      className={`w-full px-4 py-3 border transition-all duration-300 focus:outline-none focus:ring-2 ${classes.input}`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${classes.label}`}
                    >
                      {t.repetitionsLabel}
                    </label>
                    <input
                      ref={repetitionsRef}
                      type="number"
                      min="1"
                      placeholder="50"
                      value={repetitions}
                      onChange={(e) => setRepetitions(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, null)}
                      className={`w-full px-4 py-3 border transition-all duration-300 focus:outline-none focus:ring-2 ${classes.input}`}
                    />
                  </div>
                </div>
              </div>

              {/* Right Panel - Results */}
              <div
                className={`p-8 flex items-center justify-center ${classes.outputPanel}`}
              >
                {result ? (
                  <div className="text-center w-full">
                    <div
                      className={`inline-block px-6 py-4 mb-6 ${
                        result.isWorth
                          ? classes.successBadge
                          : classes.errorBadge
                      }`}
                    >
                      <div className="text-lg font-bold mb-1">
                        {result.isWorth ? t.worthResult : t.notWorthResult}
                      </div>
                    </div>

                    <div className={`text-center ${classes.resultDetails}`}>
                      <div className="text-2xl font-bold mb-2">
                        {result.isWorth ? t.timeSaved : t.timeLost}
                      </div>
                      <div className="text-3xl font-bold mb-1">
                        {result.time} {t.minutes}
                      </div>
                      <div className={`text-sm ${classes.resultSubtext}`}>
                        ({result.hours}
                        {t.hours} {result.minutes}
                        {t.minutes})
                      </div>
                    </div>

                    <button
                      onClick={handleShare}
                      className={`mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${classes.shareButton}`}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? t.copied : t.share}
                    </button>
                  </div>
                ) : (
                  <div className={`text-center ${classes.placeholder}`}>
                    <CalcIcon
                      size={48}
                      className={`mx-auto mb-4 ${classes.placeholderIcon}`}
                    />
                    <p className="text-lg font-medium mb-2">
                      {t.readyToCalculate}
                    </p>
                    <p className="text-sm">{t.fillInputs}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className={`text-sm mb-4 ${classes.footer}`}>{t.footerText}</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:scale-105 ${classes.githubLink}`}
          >
            <Github size={16} />
            view on github
          </a>
        </div>
      </div>
    </div>
  );
};

const Calculator = () => {
  return (
    <ThemeProvider>
      <CalculatorContent />
    </ThemeProvider>
  );
};

export default Calculator;
