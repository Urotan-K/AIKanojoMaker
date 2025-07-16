document.addEventListener('DOMContentLoaded', () => {
    const formElements = {
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
        emotionMixCustom: document.getElementById('emotion-mix-custom'),
        role: document.getElementById('role'),
        roleCustom: document.getElementById('role-custom'),
        location: document.getElementById('location'),
        locationCustom: document.getElementById('location-custom'),
        relationship: document.getElementById('relationship'),
        relationshipCustom: document.getElementById('relationship-custom'),
        timeOfDay: document.getElementById('time-of-day'),
        timeOfDayCustom: document.getElementById('time-of-day-custom'),
        customText: document.getElementById('custom-text'),
    };

    const chatgptPromptOutput = document.getElementById('chatgpt-prompt');
    const imagePromptOutput = document.getElementById('image-prompt');
    const randomGenerateButton = document.getElementById('random-generate');
    const copyButtons = document.querySelectorAll('.copy-button');

    // --- データ定義 --- //
    const data = {
        ears: {
            options: {
                '狐耳': 'fox ears',
                '猫耳': 'cat ears',
                'うさ耳': 'rabbit ears',
                'なし': 'none',
            },
            default: 'なし',
        },
        outfit: {
            options: {
                'ゴスロリ': 'gothic lolita dress',
                'セーラー服': 'sailor uniform',
                'チャイナドレス': 'cheongsam',
            },
            default: 'ゴスロリ',
        },
        eyeColor: {
            options: {
                '赤': 'red eyes',
                '青': 'blue eyes',
                '緑': 'green eyes',
                '茶': 'brown eyes',
                '黒': 'black eyes',
                '金': 'gold eyes',
                '銀': 'silver eyes',
            },
            default: '茶',
        },
        hairColor: {
            options: {
                '黒': 'black hair',
                '茶': 'brown hair',
                '金': 'blonde hair',
                '銀': 'silver hair',
                '赤': 'red hair',
                '青': 'blue hair',
                '緑': 'green hair',
                'ピンク': 'pink hair',
            },
            default: '黒',
        },
        hairStyle: {
            options: {
                'ショート': 'short hair',
                'ボブ': 'bob hair',
                'ロング': 'long hair',
                'ポニーテール': 'ponytail',
                'ツインテール': 'twin tails',
                'お団子': 'bun hair',
                '三つ編み': 'braids',
                '編み込み': 'braided hair',
                '外ハネ': 'outward flick hair',
                '内巻き': 'inward curl hair',
                'ストレート': 'straight hair',
                'ウェーブ': 'wavy hair',
                'カール': 'curly hair',
                'アホ毛': 'ahoge',
                '前髪ぱっつん': 'blunt bangs',
                'シースルーバング': 'see-through bangs',
                'アシンメトリー': 'asymmetrical hair',
                '姫カット': 'hime cut',
                '刈り上げ': 'undercut',
                'オールバック': 'slicked back hair',
            },
            default: 'ロング',
        },
        expression: {
            options: {
                '笑顔': 'smiling',
                '困り顔': 'troubled expression',
                '怒り顔': 'angry expression',
                '無表情': 'expressionless',
                '照れ顔': 'blushing',
            },
            default: '笑顔',
        },
        pose: {
            options: {
                '立ち姿': 'standing pose',
                '座り姿': 'sitting pose',
                '手を振る': 'waving hand',
                '寝転がる': 'lying down',
                '走る': 'running',
                '飛び跳ねる': 'jumping',
                '考える': 'thinking',
                '驚く': 'surprised',
                '隠れる': 'hiding',
                '踊る': 'dancing',
            },
            default: '立ち姿',
        },
        personality: {
            options: {
                'ツンデレ': 'tsundere',
                'ヤンデレ': 'yandere',
                '甘えんぼ': 'spoiled',
                'クール': 'cool',
                'おっとり': 'calm',
            },
            default: 'ツンデレ',
        },
        tone: {
            options: {
                '〜だよっ': '〜だよっ',
                '〜ですの': '〜ですの',
                '〜にゃ': '〜にゃ',
                '〜だぞ': '〜だぞ',
                '〜かしら': '〜かしら',
            },
            default: '〜だよっ',
        },
        first: {
            options: {
                'ボク': 'ボク',
                'わたし': 'わたし',
                '私': '私',
                '俺': '俺',
                'あたし': 'あたし',
            },
            default: 'わたし',
        },
        second: {
            options: {
                'あなた': 'あなた',
                'きみ': 'きみ',
                '〇〇くん': '〇〇くん',
                'お前': 'お前',
                '〇〇さん': '〇〇さん',
            },
            default: 'あなた',
        },
        emotionMix: {
            options: {
                'ツンデレ': 'tsundere',
                'ヤンデレ': 'yandere',
                '甘えんぼ': 'spoiled',
                'クール': 'cool',
                'おっとり': 'calm',
                '活発': 'active',
                '無気力': 'apathetic',
                '臆病': 'timid',
                '大胆': 'bold',
                '好奇心旺盛': 'curious',
                '寂しがり屋': 'lonely',
            },
        },
        role: {
            options: {
                '朝起こす役目': 'waking up',
                'お弁当を届けに来た': 'delivering lunch box',
                '嫉妬して詰め寄る': 'jealous and confronting',
                '勉強を教えてくれる': 'teaching study',
                '一緒にゲームをする': 'playing game together',
                '料理を作ってくれる': 'cooking',
                '買い物に付き合う': 'shopping together',
                '秘密を打ち明ける': 'confiding a secret',
                '励ましてくれる': 'encouraging',
                '叱ってくれる': 'scolding',
            },
            default: '朝起こす役目',
        },
        location: {
            options: {
                '教室': 'classroom',
                '自室': 'own room',
                '屋上': 'rooftop',
                'カフェ': 'cafe',
                '公園': 'park',
                '異世界': 'fantasy world',
                '図書館': 'library',
                '商店街': 'shopping street',
                '遊園地': 'amusement park',
                '海辺': 'beach',
            },
            default: '教室',
        },
        relationship: {
            options: {
                '幼馴染': 'childhood friend',
                '先生': 'teacher',
                '後輩': 'junior',
                '上司': 'boss',
                '恋人': 'lover',
                '兄妹': 'sibling',
                '親友': 'best friend',
                '隣人': 'neighbor',
                '遠い親戚': 'distant relative',
                '宿敵': 'rival',
            },
            default: '恋人',
        },
        timeOfDay: {
            options: {
                '朝': 'morning',
                '昼': 'daytime',
                '夕方': 'evening',
                '夜': 'night',
                '深夜': 'late night',
                '早朝': 'early morning',
                '正午': 'noon',
                '日没': 'sunset',
                '真夜中': 'midnight',
                '夜明け': 'dawn',
            },
            default: '朝',
        },
    };

    // --- ヘルパー関数 --- //
    function getSelectedValue(selectElement, customInputElement, colorPickerElement = null) {
        if (colorPickerElement && colorPickerElement.value && colorPickerElement.value !== '#000000') { // デフォルト値以外が選択されていればカラーピッカー優先
            return colorPickerElement.value; // HEX値をそのまま返す
        } else if (selectElement.value === 'other') {
            return customInputElement.value.trim();
        } else {
            return selectElement.value;
        }
    }

    function getSelectedText(selectElement, customInputElement, colorPickerElement = null) {
        if (colorPickerElement && colorPickerElement.value && colorPickerElement.value !== '#000000') {
            return colorPickerElement.value; // HEX値をそのまま返す
        } else if (selectElement.value === 'other') {
            return customInputElement.value.trim();
        } else {
            return selectElement.options[selectElement.selectedIndex].text;
        }
    }

    function getSliderValue(sliderElement, valueElement) {
        valueElement.textContent = sliderElement.value;
        return parseInt(sliderElement.value);
    }

    function getBodySizePrompt(value) {
        if (value < 20) return 'petite body';
        if (value < 40) return 'slender body';
        if (value < 60) return 'average body';
        if (value < 80) return 'curvy body';
        return 'voluptuous body';
    }

    function getBreastSizePrompt(value) {
        if (value < 20) return 'flat chest';
        if (value < 40) return 'small breasts';
        if (value < 60) return 'medium breasts';
        if (value < 80) return 'large breasts';
        return 'huge breasts';
    }

    function getPersonalityLevelText(personality, value) {
        if (value === 0) return `${personality}度合い：控えめ`;
        if (value === 100) return `${personality}度合い：強調`;
        return `${personality}度合い：${value}%`;
    }

    function getEmotionMixText() {
        const selectedEmotions = [];
        formElements.emotionMix.forEach(checkbox => {
            if (checkbox.checked && checkbox.value !== 'other') {
                selectedEmotions.push(data.emotionMix.options[checkbox.value]);
            }
        });
        const customEmotion = formElements.emotionMixCustom.value.trim();
        if (customEmotion) {
            selectedEmotions.push(customEmotion);
        }
        return selectedEmotions.length > 0 ? selectedEmotions.join(', ') : '';
    }

    // --- プロンプト生成ロジック --- //
    function generatePrompts() {
        // 外見
        const earsText = getSelectedText(formElements.ears, formElements.earsCustom);
        const earsPrompt = getSelectedValue(formElements.ears, formElements.earsCustom);

        const outfitText = getSelectedText(formElements.outfit, formElements.outfitCustom);
        const outfitPrompt = getSelectedValue(formElements.outfit, formElements.outfitCustom);

        const bodySizeValue = getSliderValue(formElements.bodySize, formElements.bodySizeValue);
        const bodySizePrompt = getBodySizePrompt(bodySizeValue);

        const breastSizeValue = getSliderValue(formElements.breastSize, formElements.breastSizeValue);
        const breastSizePrompt = getBreastSizePrompt(breastSizeValue);

        const eyeColorText = getSelectedText(formElements.eyeColor, formElements.eyeColorCustom, formElements.eyeColorPicker);
        const eyeColorPrompt = getSelectedValue(formElements.eyeColor, formElements.eyeColorCustom, formElements.eyeColorPicker);

        const hairColorText = getSelectedText(formElements.hairColor, formElements.hairColorCustom, formElements.hairColorPicker);
        const hairColorPrompt = getSelectedValue(formElements.hairColor, formElements.hairColorCustom, formElements.hairColorPicker);

        const hairStyleText = getSelectedText(formElements.hairStyle, formElements.hairStyleCustom);
        const hairStylePrompt = getSelectedValue(formElements.hairStyle, formElements.hairStyleCustom);

        const expressionText = getSelectedText(formElements.expression, formElements.expressionCustom);
        const expressionPrompt = getSelectedValue(formElements.expression, formElements.expressionCustom);

        const poseText = getSelectedText(formElements.pose, formElements.poseCustom);
        const posePrompt = getSelectedValue(formElements.pose, formElements.poseCustom);

        // 性格・口調
        const personalityText = getSelectedText(formElements.personality, formElements.personalityCustom);
        const personalityPrompt = getSelectedValue(formElements.personality, formElements.personalityCustom);

        const personalityLevelValue = getSliderValue(formElements.personalityLevel, formElements.personalityLevelValue);
        const personalityLevelText = getPersonalityLevelText(personalityText, personalityLevelValue);

        const toneText = getSelectedText(formElements.tone, formElements.toneCustom);
        const firstText = getSelectedText(formElements.first, formElements.firstCustom);
        const secondText = getSelectedText(formElements.second, formElements.secondCustom);
        const emotionMixText = getEmotionMixText();

        // シチュエーション
        const roleText = getSelectedText(formElements.role, formElements.roleCustom);
        const rolePrompt = getSelectedValue(formElements.role, formElements.roleCustom);

        const locationText = getSelectedText(formElements.location, formElements.locationCustom);
        const locationPrompt = getSelectedValue(formElements.location, formElements.locationCustom);

        const relationshipText = getSelectedText(formElements.relationship, formElements.relationshipCustom);
        const relationshipPrompt = getSelectedValue(formElements.relationship, formElements.relationshipCustom);

        const timeOfDayText = getSelectedText(formElements.timeOfDay, formElements.timeOfDayCustom);
        const timeOfDayPrompt = getSelectedValue(formElements.timeOfDay, formElements.timeOfDayCustom);

        // 自由記述
        const customText = formElements.customText.value.trim();
        const translatedCustom = customText; // 簡易翻訳は後で実装

        // --- ChatGPT用プロンプト生成 --- //
        let chatgptCharacterSetting = ``;
        if (earsText) chatgptCharacterSetting += `${earsText}で`;
        if (outfitText) chatgptCharacterSetting += `${outfitText}を着た`;
        chatgptCharacterSetting += `女の子。`;
        if (bodySizeValue !== 50) chatgptCharacterSetting += `体の大きさは${bodySizeValue}、`;
        if (breastSizeValue !== 50) chatgptCharacterSetting += `胸の大きさは${breastSizeValue}、`;
        if (eyeColorText) chatgptCharacterSetting += `瞳は${eyeColorText}、`;
        if (hairColorText) chatgptCharacterSetting += `髪は${hairColorText}。`;
        if (hairStyleText) chatgptCharacterSetting += `髪型は${hairStyleText}。`;
        if (expressionText) chatgptCharacterSetting += `表情は${expressionText}。`;
        if (poseText) chatgptCharacterSetting += `ポーズは${poseText}。`;
        if (personalityText) chatgptCharacterSetting += `性格は${personalityText}。`;
        if (personalityLevelValue !== 50) chatgptCharacterSetting += `${personalityLevelText}。`;
        if (emotionMixText) chatgptCharacterSetting += `感情は${emotionMixText}を混ぜている。`;
        if (firstText) chatgptCharacterSetting += `一人称は「${firstText}」。`;
        if (toneText) chatgptCharacterSetting += `語尾は「${toneText}」。`;
        if (secondText) chatgptCharacterSetting += `二人称は「${secondText}」。`;
        if (roleText) chatgptCharacterSetting += `今日の役割は「${roleText}」。`;
        if (locationText) chatgptCharacterSetting += `場所は${locationText}。`;
        if (relationshipText) chatgptCharacterSetting += `関係性は${relationshipText}。`;
        if (timeOfDayText) chatgptCharacterSetting += `時間帯は${timeOfDayText}。`;
        if (customText) chatgptCharacterSetting += `その他：${customText}。`;

        chatgptPromptOutput.value = `以下のキャラクター設定で、シチュエーションにあったセリフを日本語と英語でそれぞれ出力してください。

キャラクター設定：${chatgptCharacterSetting}`;

        // --- 画像生成用プロンプト生成 --- //
        let imagePrompt = `A cute anime girl`;
        if (earsPrompt && earsPrompt !== 'none') imagePrompt += ` with ${earsPrompt}`; 
        if (outfitPrompt) imagePrompt += `, wearing ${outfitPrompt} outfit`;
        if (bodySizePrompt) imagePrompt += `, ${bodySizePrompt}`; 
        if (breastSizePrompt) imagePrompt += `, ${breastSizePrompt}`; 
        if (eyeColorPrompt) imagePrompt += `, ${eyeColorPrompt} eyes`; 
        if (hairColorPrompt) imagePrompt += `, ${hairColorPrompt} hair`; 
        if (hairStylePrompt) imagePrompt += `, ${hairStylePrompt} hair style`; 
        if (expressionPrompt) imagePrompt += `, ${expressionPrompt} facial expression`; 
        if (posePrompt) imagePrompt += `, ${posePrompt} pose`; 
        if (rolePrompt) imagePrompt += `, in a scene where she is ${rolePrompt}`; 
        if (locationPrompt) imagePrompt += `, ${locationPrompt}`; 
        if (relationshipPrompt) imagePrompt += `, ${relationshipPrompt}`; 
        if (timeOfDayPrompt) imagePrompt += `, ${timeOfDayPrompt}`; 
        if (translatedCustom) imagePrompt += `, ${translatedCustom}`; 
        imagePrompt += `, highly detailed, anime style. 描いてください`;

        imagePromptOutput.value = imagePrompt;
    }

    // --- イベントリスナー --- //
    // 各フォーム要素の変更を監視してプロンプトを更新
    for (const key in formElements) {
        const element = formElements[key];
        if (element instanceof HTMLSelectElement || (element instanceof HTMLInputElement && element.type === 'text') || element instanceof HTMLTextAreaElement) {
            element.addEventListener('input', generatePrompts);
        } else if (element instanceof HTMLInputElement && element.type === 'range') {
            element.addEventListener('input', () => {
                generatePrompts();
                // スライダーの値をリアルタイム表示
                if (element.id === 'body-size') formElements.bodySizeValue.textContent = element.value;
                if (element.id === 'breast-size') formElements.breastSizeValue.textContent = element.value;
                if (element.id === 'personality-level') formElements.personalityLevelValue.textContent = element.value;
            });
        } else if (element instanceof NodeList) { // emotionMixのようなNodeListの場合
            element.forEach(checkbox => checkbox.addEventListener('change', generatePrompts));
        } else if (element instanceof HTMLInputElement && element.type === 'color') {
            element.addEventListener('input', generatePrompts);
        }
    }

    // 「その他」選択時のカスタム入力欄表示制御
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', (e) => {
            const customInput = document.getElementById(`${e.target.id}-custom`);
            if (customInput) {
                if (e.target.value === 'other') {
                    customInput.style.display = 'block';
                } else {
                    customInput.style.display = 'none';
                    customInput.value = ''; // 非表示時に値をクリア
                }
            }
            generatePrompts();
        });
    });

    // カラーピッカーとセレクトボックスの連携
    formElements.eyeColor.addEventListener('change', () => {
        if (formElements.eyeColor.value !== 'other') {
            formElements.eyeColorPicker.value = '#000000'; // セレクトボックスがother以外ならカラーピッカーをリセット
        }
        generatePrompts();
    });
    formElements.eyeColorPicker.addEventListener('input', () => {
        if (formElements.eyeColorPicker.value !== '#000000') {
            formElements.eyeColor.value = 'other'; // カラーピッカーが使われたらotherを選択
            formElements.eyeColorCustom.style.display = 'none'; // カスタム入力は非表示
            formElements.eyeColorCustom.value = '';
        }
        generatePrompts();
    });

    formElements.hairColor.addEventListener('change', () => {
        if (formElements.hairColor.value !== 'other') {
            formElements.hairColorPicker.value = '#000000'; // セレクトボックスがother以外ならカラーピッカーをリセット
        }
        generatePrompts();
    });
    formElements.hairColorPicker.addEventListener('input', () => {
        if (formElements.hairColorPicker.value !== '#000000') {
            formElements.hairColor.value = 'other'; // カラーピッカーが使われたらotherを選択
            formElements.hairColorCustom.style.display = 'none'; // カスタム入力は非表示
            formElements.hairColorCustom.value = '';
        }
        generatePrompts();
    });

    // 性格の度合いラベルの動的変更
    formElements.personality.addEventListener('change', () => {
        const selectedPersonalityText = formElements.personality.options[formElements.personality.selectedIndex].text;
        formElements.personalityLevelLabel.textContent = `${selectedPersonalityText}の度合い`;
        generatePrompts();
    });

    // コピーボタン
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

    // ランダム生成
    randomGenerateButton.addEventListener('click', () => {
        // 各セレクトボックスをランダムに設定
        for (const key in data) {
            const item = data[key];
            if (item.options) {
                const options = Object.keys(item.options);
                const randomOptionKey = options[Math.floor(Math.random() * options.length)];
                const selectElement = formElements[key];

                if (selectElement instanceof HTMLSelectElement) {
                    selectElement.value = randomOptionKey;
                    selectElement.dispatchEvent(new Event('change')); // プログラムによる変更でもchangeイベントを発火
                    // 「その他」が選択された場合はカスタム入力もランダムに
                    const customInput = document.getElementById(`${key}-custom`);
                    if (randomOptionKey === 'other' && customInput) {
                        const randomCustomText = `ランダム${Math.floor(Math.random() * 100)}`; // 仮のランダムテキスト
                        customInput.value = randomCustomText;
                        customInput.style.display = 'block';
                    } else if (customInput) {
                        customInput.style.display = 'none';
                        customInput.value = '';
                    }
                    // カラーピッカーのリセット
                    if (key === 'eyeColor' && formElements.eyeColorPicker) formElements.eyeColorPicker.value = '#000000';
                    if (key === 'hairColor' && formElements.hairColorPicker) formElements.hairColorPicker.value = '#000000';

                } else if (key === 'emotionMix') {
                    // emotionMixはチェックボックスなので特別処理
                    formElements.emotionMix.forEach(checkbox => checkbox.checked = false);
                    const numToSelect = Math.floor(Math.random() * (options.length / 2)) + 1; // 1〜半分の数を選択
                    for (let i = 0; i < numToSelect; i++) {
                        const randomIndex = Math.floor(Math.random() * options.length);
                        const randomCheckboxValue = options[randomIndex];
                        const checkbox = document.querySelector(`input[name="emotion-mix"][value="${randomCheckboxValue}"]`);
                        if (checkbox) checkbox.checked = true;
                    }
                    // emotionMixCustomもランダムに
                    const customEmotionMixInput = formElements.emotionMixCustom;
                    if (Math.random() < 0.3) { // 30%の確率でカスタムも埋める
                        customEmotionMixInput.value = `ランダム感情${Math.floor(Math.random() * 100)}`;
                        customEmotionMixInput.style.display = 'block';
                    } else {
                        customEmotionMixInput.value = '';
                        customEmotionMixInput.style.display = 'none';
                    }
                }
            }
        }

        // スライダーのランダム生成
        formElements.bodySize.value = Math.floor(Math.random() * (parseInt(formElements.bodySize.max) - parseInt(formElements.bodySize.min) + 1)) + parseInt(formElements.bodySize.min);
        formElements.breastSize.value = Math.floor(Math.random() * (parseInt(formElements.breastSize.max) - parseInt(formElements.breastSize.min) + 1)) + parseInt(formElements.breastSize.min);
        formElements.personalityLevel.value = Math.floor(Math.random() * (parseInt(formElements.personalityLevel.max) - parseInt(formElements.personalityLevel.min) + 1)) + parseInt(formElements.personalityLevel.min);

        // カラーピッカーのランダム生成
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
        formElements.eyeColorPicker.value = randomColor;
        formElements.eyeColor.value = 'other'; // カラーピッカーが使われたらotherを選択
        formElements.eyeColorCustom.style.display = 'none';
        formElements.eyeColorCustom.value = '';

        const randomColor2 = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
        formElements.hairColorPicker.value = randomColor2;
        formElements.hairColor.value = 'other'; // カラーピッカーが使われたらotherを選択
        formElements.hairColorCustom.style.display = 'none';
        formElements.hairColorCustom.value = '';

        // 自由入力欄のランダム生成 (簡易版)
        const randomCustomTexts = [
            '髪型はツインテール',
            '瞳は猫のような縦長',
            '背景は夕焼けの教室',
            '主人公とは幼い頃からの許嫁',
            '猫が好き',
            '甘いものが好き',
            '読書が趣味',
            '運動神経抜群',
            '少しドジっ子',
            '実は宇宙人',
        ];
        formElements.customText.value = randomCustomTexts[Math.floor(Math.random() * randomCustomTexts.length)];

        generatePrompts();
    });

    // 初期プロンプト生成
    generatePrompts();

    // 初期表示時に「その他」のカスタム入力欄を非表示にする
    document.querySelectorAll('select').forEach(select => {
        const customInput = document.getElementById(`${select.id}-custom`);
        if (customInput && select.value !== 'other') {
            customInput.style.display = 'none';
        }
    });

    // emotionMixCustomも初期非表示
    formElements.emotionMixCustom.style.display = 'none';
});
