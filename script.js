document.addEventListener('DOMContentLoaded', () => {
    const formElements = {
        charName: document.getElementById('char-name'),
        ears: document.getElementById('ears'),
        earsCustom: document.getElementById('ears-custom'),
        outfit: document.getElementById('outfit'),
        outfitCustom: document.getElementById('outfit-custom'),
        bodySize: document.getElementById('body-size'),
        bodySizeValue: document.getElementById('body-size-value'),
        breastSize: document.getElementById('breast-size'),
        breastSizeValue: document.getElementById('breast-size-value'),
        eyeColor: document.getElementById('eye-color'),
        eyeColorCustom: document.getElementById('eye-color-custom'),
        eyeColorPicker: document.getElementById('eye-color-picker'),
        hairColor: document.getElementById('hair-color'),
        hairColorCustom: document.getElementById('hair-color-custom'),
        hairColorPicker: document.getElementById('hair-color-picker'),
        hairStyle: document.getElementById('hair-style'),
        hairStyleCustom: document.getElementById('hair-style-custom'),
        expression: document.getElementById('expression'),
        expressionCustom: document.getElementById('expression-custom'),
        pose: document.getElementById('pose'),
        poseCustom: document.getElementById('pose-custom'),
        personality: document.getElementById('personality'),
        personalityCustom: document.getElementById('personality-custom'),
        personalityLevel: document.getElementById('personality-level'),
        personalityLevelLabel: document.getElementById('personality-level-label'),
        personalityLevelValue: document.getElementById('personality-level-value'),
        tone: document.getElementById('tone'),
        toneCustom: document.getElementById('tone-custom'),
        first: document.getElementById('first'),
        firstCustom: document.getElementById('first-custom'),
        second: document.getElementById('second'),
        secondCustom: document.getElementById('second-custom'),
        emotionMix: document.querySelectorAll('input[name="emotion-mix"]'),
        role: document.getElementById('role'),
        roleCustom: document.getElementById('role-custom'),
        location: document.getElementById('location'),
        locationCustom: document.getElementById('location-custom'),
        relationship: document.getElementById('relationship'),
        relationshipCustom: document.getElementById('relationship-custom'),
        timeOfDay: document.getElementById('time-of-day'),
        timeOfDayCustom: document.getElementById('time-of-day-custom'),
        customText: document.getElementById('custom-text')
    };

    const chatgptPromptOutput = document.getElementById('chatgpt-prompt');
    const imagePromptOutput = document.getElementById('image-prompt');
    const randomGenerateButton = document.getElementById('random-generate');
    const resetButton = document.getElementById('reset-form');
    const copyButtons = document.querySelectorAll('.copy-button');
    const accordions = document.querySelectorAll('.accordion-header');

    const sliderLabels = {
        1: 'とても低い',
        2: '低い',
        3: '普通',
        4: '高い',
        5: 'とても高い'
    };

    const breastSizeLabels = {
        1: 'とても小さい',
        2: '小さい',
        3: '普通',
        4: '大きい',
        5: 'とても大きい'
    };

    const personalityLabels = {
        1: 'とても弱い',
        2: '弱い',
        3: '普通',
        4: '強い',
        5: 'とても強い'
    };

    function getSelectedValue(selectElement, customInputElement) {
        if (selectElement.value === 'other') {
            return customInputElement.value.trim();
        } else {
            return selectElement.value;
        }
    }

    function getSelectedText(selectElement, customInputElement) {
        if (selectElement.value === 'other') {
            return customInputElement.value.trim();
        } else {
            return selectElement.options[selectElement.selectedIndex].text;
        }
    }

    function generatePrompts() {
        const charName = formElements.charName.value.trim() || 'キャラクター';

        let chatGPTPrompt = `これからロールプレイをします。以下の設定に従って、キャラクターになりきって会話してください.\n\n`;
        chatGPTPrompt += `■名前\n${charName}\n\n`;

        // 外見
        let appearance = '';
        const earsText = getSelectedText(formElements.ears, formElements.earsCustom);
        if (earsText && earsText !== 'なし') appearance += `・耳: ${earsText}\n`;

        const outfitText = getSelectedText(formElements.outfit, formElements.outfitCustom);
        if (outfitText) appearance += `・服装: ${outfitText}\n`;

        const bodySize = formElements.bodySize.value;
        appearance += `・身長: ${sliderLabels[bodySize]}\n`;

        const breastSize = formElements.breastSize.value;
        appearance += `・胸の大きさ: ${breastSizeLabels[breastSize]}\n`;

        const eyeColorText = getSelectedText(formElements.eyeColor, formElements.eyeColorCustom);
        if (eyeColorText) appearance += `・目の色: ${eyeColorText}\n`;

        const hairColorText = getSelectedText(formElements.hairColor, formElements.hairColorCustom);
        if (hairColorText) appearance += `・髪の色: ${hairColorText}\n`;

        const hairStyleText = getSelectedText(formElements.hairStyle, formElements.hairStyleCustom);
        if (hairStyleText) appearance += `・髪型: ${hairStyleText}\n`;

        const expressionText = getSelectedText(formElements.expression, formElements.expressionCustom);
        if (expressionText) appearance += `・表情: ${expressionText}\n`;

        const poseText = getSelectedText(formElements.pose, formElements.poseCustom);
        if (poseText) appearance += `・ポーズ: ${poseText}\n`;

        if(appearance) chatGPTPrompt += `■外見\n${appearance}\n`;

        // 性格・口調
        let personalityTone = '';
        const personalityText = getSelectedText(formElements.personality, formElements.personalityCustom);
        if (personalityText) {
            const personalityLevel = formElements.personalityLevel.value;
            personalityTone += `・性格: ${personalityText} (${personalityLabels[personalityLevel]})\n`;
        }

        const toneValue = formElements.tone.value;
        const tone = toneValue === 'other' ? formElements.toneCustom.value.trim() : toneValue;
        if (tone) personalityTone += `・口調（語尾）: ${tone}\n`;

        let first = getSelectedText(formElements.first, formElements.firstCustom);
        if (first === '自分の名前') {
            first = charName;
        }
        if (first) personalityTone += `・一人称: ${first}\n`;

        const second = getSelectedText(formElements.second, formElements.secondCustom);
        if (second) personalityTone += `・二人称: ${second}\n`;

        const emotionMix = Array.from(formElements.emotionMix)
            .filter(i => i.checked)
            .map(i => i.parentElement.textContent.trim())
            .join(', ');
        if (emotionMix) personalityTone += `・感情ミックス: ${emotionMix}\n`;

        if(personalityTone) chatGPTPrompt += `■性格・口調\n${personalityTone}\n`;

        // シチュエーション
        let situation = '';
        const roleText = getSelectedText(formElements.role, formElements.roleCustom);
        if (roleText) situation += `・役割: ${roleText}\n`;

        const locationText = getSelectedText(formElements.location, formElements.locationCustom);
        if (locationText) situation += `・場所: ${locationText}\n`;

        const relationshipText = getSelectedText(formElements.relationship, formElements.relationshipCustom);
        if (relationshipText) situation += `・関係性: ${relationshipText}\n`;

        const timeOfDayText = getSelectedText(formElements.timeOfDay, formElements.timeOfDayCustom);
        if (timeOfDayText) situation += `・時間帯: ${timeOfDayText}\n`;

        if(situation) chatGPTPrompt += `■シチュエーション\n${situation}\n`;

        const customText = formElements.customText.value.trim();
        if (customText) {
            chatGPTPrompt += `■自由記述\n${customText}\n`;
        }

        chatGPTPrompt += `\n以上の設定になりきって、私と会話をしてください。`;

        chatgptPromptOutput.value = chatGPTPrompt;

        // 画像生成用プロンプト
        let imagePrompt = 'best quality, masterpiece, an anime girl,';
        const earsValue = getSelectedValue(formElements.ears, formElements.earsCustom);
        if (earsValue && earsValue !== 'none') imagePrompt += ` ${earsValue},`;
        imagePrompt += ` ${getSelectedValue(formElements.outfit, formElements.outfitCustom)},`;
        imagePrompt += ` ${getSelectedValue(formElements.eyeColor, formElements.eyeColorCustom)} eyes,`;
        imagePrompt += ` ${getSelectedValue(formElements.hairColor, formElements.hairColorCustom)} hair,`;
        imagePrompt += ` ${getSelectedValue(formElements.hairStyle, formElements.hairStyleCustom)},`;
        imagePrompt += ` ${getSelectedValue(formElements.expression, formElements.expressionCustom)},`;
        imagePrompt += ` ${getSelectedValue(formElements.pose, formElements.poseCustom)},`;
        imagePrompt += ` ${getSelectedValue(formElements.location, formElements.locationCustom)},`;
        imagePrompt += ` ${getSelectedValue(formElements.timeOfDay, formElements.timeOfDayCustom)},`;
        if (customText) imagePrompt += ` ${customText},`;

        imagePromptOutput.value = imagePrompt + ' Please draw.';
    }

    function updateSliderValue(slider, label, labels) {
        label.textContent = labels[slider.value];
    }

    function resetForm() {
        formElements.charName.value = '';
        
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
            const event = new Event('change', { bubbles: true });
            select.dispatchEvent(event);
        });

        const sliders = document.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            slider.value = slider.defaultValue;
            const event = new Event('input', { bubbles: true });
            slider.dispatchEvent(event);
        });

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        formElements.customText.value = '';

        generatePrompts();
    }

    formElements.bodySize.addEventListener('input', () => {
        updateSliderValue(formElements.bodySize, formElements.bodySizeValue, sliderLabels);
        generatePrompts();
    });
    formElements.breastSize.addEventListener('input', () => {
        updateSliderValue(formElements.breastSize, formElements.breastSizeValue, breastSizeLabels);
        generatePrompts();
    });
    formElements.personalityLevel.addEventListener('input', () => {
        updateSliderValue(formElements.personalityLevel, formElements.personalityLevelValue, personalityLabels);
        generatePrompts();
    });

    Object.values(formElements).forEach(element => {
        if (element.nodeName === 'SELECT' || element.nodeName === 'TEXTAREA' || (element.nodeName === 'INPUT' && element.type !== 'range' && element.type !== 'checkbox')) {
            element.addEventListener('input', generatePrompts);
        }
    });

    formElements.emotionMix.forEach(checkbox => {
        checkbox.addEventListener('change', generatePrompts);
    });

    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', (e) => {
            const customInput = document.getElementById(`${e.target.id}-custom`);
            if (customInput) {
                customInput.style.display = e.target.value === 'other' ? 'block' : 'none';
                if (e.target.value !== 'other') {
                    customInput.value = '';
                }
            }
            generatePrompts();
        });
    });

    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.target.dataset.target;
            const targetElement = document.getElementById(targetId);
            targetElement.select();
            document.execCommand('copy');
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 1500);
        });
    });

    randomGenerateButton.addEventListener('click', () => {
        formElements.charName.value = 'セレナ';
        
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            const options = select.options;
            select.selectedIndex = Math.floor(Math.random() * options.length);
            const event = new Event('change', { bubbles: true });
            select.dispatchEvent(event);
        });

        const sliders = document.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            slider.value = Math.floor(Math.random() * (slider.max - slider.min + 1)) + parseInt(slider.min);
            const event = new Event('input', { bubbles: true });
            slider.dispatchEvent(event);
        });

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = Math.random() > 0.5;
        });

        formElements.customText.value = '';

        generatePrompts();
    });

    resetButton.addEventListener('click', resetForm);

    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            accordion.classList.toggle('active');
            const content = accordion.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    // Initial prompt generation
    generatePrompts();
    updateSliderValue(formElements.bodySize, formElements.bodySizeValue, sliderLabels);
    updateSliderValue(formElements.breastSize, formElements.breastSizeValue, breastSizeLabels);
    updateSliderValue(formElements.personalityLevel, formElements.personalityLevelValue, personalityLabels);
});