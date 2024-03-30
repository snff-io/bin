   function ansiToHtml(ansiString) {
        // Regular expression to match ANSI escape codes
        const ansiRegex = /\x1b\[48;2;(\d+);(\d+);(\d+)m\x1b\[38;2;(\d+);(\d+);(\d+)m|\x1b\[0m/g;

        // Initialize HTML string
        let htmlString = '';
        let rowHtml = ''; // HTML for current row
        let nestedSpanCount = 0; // Track nested span count

        // Parse ANSI escape codes and generate HTML spans
        let match;
        while ((match = ansiRegex.exec(ansiString)) !== null) {
            if (match[0] === '\x1b[0m') {
                // ANSI reset found
                if (nestedSpanCount > 0) {
                    htmlString += `<div style="white-space: nowrap;">${rowHtml}</div>`;
                    rowHtml = ''; // Reset row HTML
                    nestedSpanCount = 0; // Reset nested span count
                }
                continue; // Skip to the next match
            }

            const r_bg = match[1];
            const g_bg = match[2];
            const b_bg = match[3];
            const r_fg = match[4];
            const g_fg = match[5];
            const b_fg = match[6];

            const text = '▄'; // Use any suitable text representation here

            rowHtml += `<span style="color: rgb(${r_fg}, ${g_fg}, ${b_fg}); background-color: rgb(${r_bg}, ${g_bg}, ${b_bg});">${text}</span>`;
            nestedSpanCount++;
        }

        // If there's any remaining content after the last ANSI reset
        if (nestedSpanCount > 0) {
            htmlString += `<div style="white-space: nowrap;">${rowHtml}</div>`;
        }

        return htmlString;
    }
