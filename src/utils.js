export const calculateAutomationWorth = (
  automationTime,
  manualTime,
  repetitions
) => {
  if (
    !automationTime ||
    !manualTime ||
    !repetitions ||
    automationTime < 0 ||
    manualTime < 0 ||
    repetitions < 1
  ) {
    return null;
  }

  const totalManualTime = manualTime * repetitions;
  const timeDifference = Math.abs(totalManualTime - automationTime);
  const isWorth = automationTime <= totalManualTime;

  const hours = Math.floor(timeDifference / 60);
  const minutes = Math.round(timeDifference % 60);

  return {
    isWorth,
    time: timeDifference.toFixed(1),
    hours,
    minutes,
    totalManualTime: totalManualTime.toFixed(1),
    automationTime: automationTime.toFixed(1),
    efficiency: (
      ((totalManualTime - automationTime) / totalManualTime) *
      100
    ).toFixed(1),
  };
};

export const loadUrlParams = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {
      automationTime: urlParams.get("a") || "",
      manualTime: urlParams.get("m") || "",
      repetitions: urlParams.get("r") || "",
    };

    // Validate loaded params
    if (
      params.automationTime &&
      (isNaN(params.automationTime) || params.automationTime < 0)
    ) {
      params.automationTime = "";
    }
    if (
      params.manualTime &&
      (isNaN(params.manualTime) || params.manualTime < 0)
    ) {
      params.manualTime = "";
    }
    if (
      params.repetitions &&
      (isNaN(params.repetitions) || params.repetitions < 1)
    ) {
      params.repetitions = "";
    }

    return params;
  } catch (error) {
    console.warn("Error loading URL parameters:", error);
    return { automationTime: "", manualTime: "", repetitions: "" };
  }
};

export const generateShareUrl = (automationTime, manualTime, repetitions) => {
  try {
    const params = new URLSearchParams({
      a: automationTime.toString(),
      m: manualTime.toString(),
      r: repetitions.toString(),
    });

    return `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;
  } catch (error) {
    console.warn("Error generating share URL:", error);
    return window.location.href;
  }
};

export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const result = document.execCommand("copy");
      document.body.removeChild(textArea);
      return result;
    }
  } catch (err) {
    console.warn("Failed to copy to clipboard:", err);
    return false;
  }
};

export const formatTime = (minutes) => {
  if (minutes < 1) {
    return `${Math.round(minutes * 60)}s`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (hours === 0) {
    return `${mins}min`;
  }

  return mins === 0 ? `${hours}h` : `${hours}h ${mins}min`;
};

export const validateInput = (value, type = "number") => {
  if (!value) return { isValid: false, error: "Required field" };

  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return { isValid: false, error: "Must be a number" };
  }

  if (type === "positive" && numValue <= 0) {
    return { isValid: false, error: "Must be greater than 0" };
  }

  if (type === "integer" && !Number.isInteger(numValue)) {
    return { isValid: false, error: "Must be a whole number" };
  }

  return { isValid: true, error: null };
};
