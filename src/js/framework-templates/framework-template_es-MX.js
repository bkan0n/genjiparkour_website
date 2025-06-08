// framework-template_es-MX.js (auto)
export const frameworkTemplate = `configuración
{
	principal
	{
		Nombre del modo: "Genji Parkour - 源氏跑酷 - v1.10.3F"
		Descripción: "\\n\\n\\n◀ The Official Genji Parkour Editor ▶\\nCode: 54CRY\\nAdapted by: LulledLion, FishoFire, Nebula\\nv1.10.3F"
	}
	sala de espera
	{
		Permite jugadores en cola: Sí
		Chat de voz de partida: Deshabilitado
		Cantidad máxima de espectadores: 3
		Máximo de jugadores para Equipo 1: 11
		Máximo de jugadores para Equipo 2: 0
		Ir a sala de espera: Nunca
		Cambiar equipos después de la partida: No
	}
	modos
	{
		General
		{
			Permitir cambio de héroe: No
			Barras de salud de enemigos: No
			Iniciar modo de juego: Inmediatamente
			Límite de héroes: No
			Cámara mortal: No
			Historial de eliminaciones: No
			Escala de tiempo de reaparición: 0%
			Suministros de salud: Deshabilitado
			Reaparecer como héroe aleatorio: Activado
		}
		Escaramuza
		{
			mapas habilitados
			{
			}
			Habilitar ventajas: No
		}
		Combate a muerte por equipos
		{
			mapas habilitados
			{
			}
			Habilitar ventajas: No
			Reaparición autoiniciada: No
		}
		deshabilitado Cazarrecompensas
		{
			Habilitar ventajas: No
		}
		deshabilitado Captura la bandera
		{
			Habilitar ventajas: No
		}
		deshabilitado Eliminación
		{
			Habilitar ventajas: No
		}
		deshabilitado Campo de pruebas
		{
			Habilitar ventajas: No
		}
	}
	héroes
	{
		General
		{
			Genji
			{
				Desviar: No
				Sin requisitos de munición: Activado
				Tiempo de reutilización de Golpe ágil: 1%
				Duración de la habilidad máxima: 25%
				Generación de la habilidad máxima - Pasiva Hoja dragón: 0%
				Generación de la habilidad máxima Hoja dragón: 10%
			}
			héroes habilitados
			{
				Genji
			}
		}
	}
	extensiones
	{
		Aparecer más robots de entrenamiento
		Reproducir más efectos
	}
}
variables {
    global:
        0: A
        2: C
        3: MsDestructo
        4: TimeRemaining
        5: PortalEffects
        7: H
        8: I
        10: K
        12: Dao
        13: SHIFT
        14: EditSelected
        15: EditSelectIdArray
        18: TQ
        20: TQ2
        21: EditorMoveItem
        22: EditMode
        23: TQ5
        24: TQ6
        25: BounceToggleLock
        26: killballnumber
        27: pinballnumber
        30: save
        32: LeaderBoardFull
        33: LeaderBoardHuds
        34: LeaderBoardRemake
        35: kaxiaotiao
        38: NANBA
        39: DashExploitToggle
        40: PortalNames
        41: PortalLoc
        42: PortalDest
        43: PortalOn
        44: Difficultyhud
        45: CustomPortalStart
        46: CustomPortalEndpoint
        47: CustomPortalCP
        50: CompMode
        51: CompTime
        52: CompAtmpNum
        53: CompAtmpSaveNames
        54: CompAtmpSaveCount
        55: CompRestartLimit
        56: instructiontext
        57: TitleData
        58: HudStoreEdit
        60: SaveName
        61: SaveCp
        62: SaveEnt
        63: SaveTimer
        64: SaveElapsed
        65: SavePauseTime
        66: SavePauseEnabled
        67: HintCp
        68: HintText
        69: ColorConfig
        70: Name
        71: Code
        73: Cachedcredits
        74: CpHudText
        75: CpHudCp
        76: CpIwtText
        77: CpIwtCp
        78: CpIwtPos
        79: CpIwtColor
        80: BanTriple
        81: BanMulti
        82: BanCreate
        83: BanDead
        84: BanEmote
        85: BanClimb
        86: BanBhop
        87: BanStand
        88: BanDjump
        89: BanSaveDouble
        90: DestructoIter
        91: MapVectorArray
    jugador:
        0: lockState
        1: checkpoint_current
        2: checkpoint_practice
        3: checkpoint_moved
        4: checkpoint_notLast
        5: timer_normal
        6: timer_practice
        7: timer_split
        8: timer_splitDisplay
        9: toggle_invincible
        10: toggle_spectate
        11: toggle_practice
        12: toggle_quickRestart
        13: toggle_guide
        14: toggle_leaderboard
        15: toggle_invisible
        16: toggle_hints
        17: skill_countBhops
        18: skill_usedHop
        19: skill_countCreates
        20: skill_countMulti
        21: skill_usedClimb
        22: skill_usedBhop
        23: skill_usedDouble
        24: skill_ultCd
        25: banString
        26: ban_multi
        27: ban_create
        28: ban_dead
        29: ban_emote
        30: ban_climb
        31: ban_bhop
        32: ban_standcreate
        33: ban_djump
        34: ban_savedouble
        35: cache_collectedLocks
        36: cache_bounceTouched
        37: cache_portalStart
        38: cache_portalEnd
        39: cache_bounceMaxLocks
        40: cache_killPosition
        41: cache_killRadii
        42: cache_bouncePosition
        43: cache_inputs
        44: cache_rainbow
        45: cache_titleHud
        46: preview_array1
        47: preview_array2
        48: preview_i
        49: editor_on
        50: editor_modeSelect
        51: editor_fly
        52: editor_saveCache
        53: editor_undo
        54: editor_lock
        55: editor_hitboxEffect
        56: editor_hitboxToggle
        57: editor_bounceIndex
        58: editor_killIndex
        59: editor_temp
        60: comp_done
        61: comp_countAttempts
        62: comp_instructionHud
        63: addon_toggle3rdPov
        64: addon_ledgeDash
        65: addon_bounceId
        66: addon_enableDoubleChecks
}
subrutinas {
    0: StartGame
    1: LeaderboardUpdate
    2: CheckpointFailReset
    3: UpdateTitle
    4: DashUltGive
    5: CheckUlt
    6: CheckDash
    7: UpdateCache
    8: DeleteSave
    9: MakeSave
    10: TimerPause
    11: TimerResume
    12: EditUpdateSelectedIds
    13: EditorSelectLast
    14: AddonCustomLoadAndReset
    15: AddonCheckMap
    16: Addon3rdPerson
    17: RebuildKillOrbs
    18: RebuildPortals
    19: RebuildBounceOrbs
}
//Optimize for size enabled
regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页    </fg>v1.10.3F") {
    evento {
        En curso - Global;
    }
    acciones {
        "◀ The Official Genji Parkour Editor ▶\\nDiscord: dsc.gg/genjiparkour\\nCode: 54CRY\\nAdapted by: LulledLion, FishoFire, Nebula"
        Abortar;
    }
}

regla ("<tx0C00000000001344> Editor <tx0C00000000001344>") {
    evento {
        En curso - Global;
    }
}

regla ("Editor | Clear Excess Data to Save Map") {
    evento {
        En curso - Global;
    }
    condiciones {
        "@Event eachPlayer\\n@Condition eventPlayer == hostPlayer"
        (Jugador anfitrión).editor_on != Falso;
        Botón presionado(Jugador anfitrión, Botón(Melé)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Interactuar)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Recargar)) == Verdadero;
    }
    acciones {
        "@Condition hostPlayer.editor_lock == false # !!! don't lock. always be sure data can be exported incase of a perma lock situation"
        Esperar(Verdadero, Cancelar cuando es falso);
        "doesnt matter thats its in pasta's because it wil be fixed on spawning"
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Establecer variable de jugador(Jugador anfitrión, editor_saveCache, Matriz(Global.TimeRemaining, Global.ColorConfig));
        Establecer variable global(TimeRemaining, Nulo);
        Establecer variable global(ColorConfig, Nulo);
        Establecer variable global(C, Nulo);
        Establecer variable global(K, Nulo);
        Establecer variable global(NANBA, Nulo);
        Establecer variable global(TQ2, Nulo);
        Establecer variable global(SaveName, Nulo);
        Establecer variable global(SaveCp, Nulo);
        Establecer variable global(SaveTimer, Nulo);
        Establecer variable global(SaveEnt, Nulo);
        "SavePauseTime = null\\nSavePauseEnabled = null"
        Establecer variable global(SaveElapsed, Nulo);
        Establecer variable global(CompMode, Nulo);
        "LeaderBoardFull = null\\nLeaderBoardHuds = null"
        Establecer variable global(PortalOn, Nulo);
        Establecer variable global(TitleData, Nulo);
        Establecer variable global(CpHudText, Nulo);
        Establecer variable global(CpHudCp, Nulo);
        Establecer variable global(HintText, Nulo);
        Establecer variable global(HintCp, Nulo);
        Establecer variable global(CpIwtText, Nulo);
        Establecer variable global(CpIwtCp, Nulo);
        Establecer variable global(CpIwtPos, Nulo);
        Establecer variable global(CpIwtColor, Nulo);
        Establecer variable global(PortalNames, Nulo);
        Establecer variable global(PortalLoc, Nulo);
        Establecer variable global(PortalDest, Nulo);
        Establecer variable global(PortalEffects, Nulo);
        Si(Comparar(Global.Name, ==, Cadena personalizada("name here - 作者")));
            Establecer variable global(Name, Cadena personalizada("{0}", Jugador anfitrión));
        Fin;
        Establecer variable global(Cachedcredits, Matriz(Global.Name, Global.Code));
        Establecer variable global(Name, Nulo);
        Establecer variable global(Code, Nulo);
        Comenzar regla(AddonCheckMap, Hacer nada);
        Crear texto del HUD(Jugador anfitrión, Cadena personalizada("­"), Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   0. 清理无用数据:\\n (此窗口打开时将自动完成)\\n\\n   1. 复制数据:\\n Esc → 打开地图工坊查看器 → 右下角'变量目标'改为全局\\n 点击窗口下方图标 (X) 复制作图数据\\n\\n   2. 录入数据:\\n Esc → 打开地图工坊编辑器{0}", Cadena personalizada(" → 规则第(2/2)页 → 展开规则'数据录入 <---- 在这输入'\\n 点击'动作'一栏右侧橙色粘贴图标 录入数据\\n\\n   3. 地图工坊设置:\\n ESC → 显示大厅 → 设置 → 地图工坊设置→\\n 拉至底部 关闭'作图模式'\\n 选择地图难度\\n{0}", Cadena personalizada("\\n   4. 创建初始地图代码:\\n Esc → 显示大厅 → 设置 → 分享代码 →\\n 创建新的代码 → 复制并记下代码\\n\\n   5. 添加作者信息:\\n Esc → 打开地图工坊编辑器 → 规则第(2/2)页 → 展开规则'Credits here {0}", Cadena personalizada("- 作者名字'\\n 修改自定义字符串文本框中的内容\\n\\n   6. 更新地图及作者信息:\\n Esc → 显示大厅 → 设置 → 共享代码 →\\n 上传至现有代码 → 粘贴步骤4中获得的代码")))), Cadena personalizada("   0. clear excess data:\\n Already done when opening this window\\n\\n   1. Copy data:\\n Open Workshop Inspector → Set variable tar{0}", Cadena personalizada("get as global\\n click the [x]\\n\\n   2. Insert data:\\n Paste the data into rule named 'Map Data <---- INSERT HERE'\\n\\n   3. Workshop{0}", Cadena personalizada(" settings:\\n ESC → SHOW LOBBY → SETTINGS → workshop settings →\\n toggle 'Editor mode' off\\n Select display difficulty\\n\\n   4. Cre{0}", Cadena personalizada("ate initial sharecode:\\n ESC → SHOW LOBBY → SETTINGS → SHARE CODE →\\n CREATE NEW CODE → COPY CODE\\n\\n   5. Add credits:\\n Enter yo{0}", Cadena personalizada("ur name & map code in the 'Credits here' rule\\n\\n   6. Update for credits:\\n ESC → SHOW LOBBY → SETTINGS → SHARE CODE →\\n UPLOAD {0}", Cadena personalizada("TO EXISTING CODE → PASTE THE CODE YOU CREATED IN STEP 4"))))))), Arriba, -185, Color(Verde lima), Nulo, Color(Verde lima), Cadena, Visibilidad predeterminada);
        Establecer variable de jugador según el índice(Jugador anfitrión, editor_saveCache, 2, ID de texto anterior);
        Crear texto del HUD(Jugador anfitrión, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("    > 按互动键关闭当前窗口 <    "), Cadena personalizada("    > Press Interact to close this window <    ")), Nulo, Nulo, Arriba, -183, Color(Verde lima), Nulo, Nulo, Cadena, Visibilidad predeterminada);
        Establecer variable de jugador según el índice(Jugador anfitrión, editor_saveCache, 3, ID de texto anterior);
        Activar registro de Inspector;
        Desactivar registro de Inspector;
        Esperar hasta(No(Botón presionado(Jugador anfitrión, Botón(Interactuar))), 999999999999);
        Esperar hasta(Botón presionado(Jugador anfitrión, Botón(Interactuar)), 999999999999);
        Establecer variable global(TimeRemaining, Primero de((Jugador anfitrión).editor_saveCache));
        Establecer variable global(ColorConfig, Valor en la matriz((Jugador anfitrión).editor_saveCache, Verdadero));
        Destruir texto del HUD(Valor en la matriz((Jugador anfitrión).editor_saveCache, 2));
        Destruir texto del HUD(Último de((Jugador anfitrión).editor_saveCache));
        Establecer variable de jugador(Jugador anfitrión, editor_saveCache, Nulo);
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
    }
}

regla ("Editor | Hud and Effects") {
    evento {
        En curso - Global;
    }
    acciones {
        Esperar(0.832000000000000, Ignorar condición);
        "cant be condition because host player can leaves, removing the rule fx"
        Esperar hasta(La entidad existe(Todos los jugadores(Todos los equipos)), 999999999999);
        Esperar(Falso, Ignorar condición);
        Si((Todos los jugadores(Todos los equipos)).editor_on);
            "hostPlayer.editor_lock = true\\nremove unnesesary huds"
            Mientras(Conteo de(Global.HudStoreEdit));
                Destruir texto del HUD(Primero de(Global.HudStoreEdit));
                Destruir texto dentro del mundo(Primero de(Global.HudStoreEdit));
                Modificar variable global(HudStoreEdit, Eliminar de la matriz por índice, Falso);
            Fin;
            Esperar(Falso, Ignorar condición);
            "infinite time and attempts"
            Si(Global.CompMode);
                Establecer variable global(CompAtmpNum, Nulo);
                Establecer variable global(CompTime, 999999999999);
                Establecer variable de jugador(Todos los jugadores(Todos los equipos), comp_countAttempts, Nulo);
                Establecer variable de jugador(Todos los jugadores(Todos los equipos), comp_done, Falso);
            Fin;
            Crear texto del HUD((Jugador local).toggle_guide, Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0}+{1}+{2} | 重新开始", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Interactuar))), Cadena personalizada("{0}+{1}+{2} | Restart", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Interactuar)))), Derecha, -156, Nulo, Nulo, Valor en la matriz(Global.ColorConfig, 5), Visible para y cadena, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else((Jugador anfitrión).toggle_guide, Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else(Global.EditorMoveItem, Cadena personalizada("方向键 | 移动实体 \\n{0} | 向上移动 \\n{1} | 向下移动 \\n{2} (长按) | 快速移动", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Saltar))), Valor en la matriz(Matriz(Cadena personalizada("{0} + {1} | 新建检查点\\n{0} + {2} | 删除选中的检查点", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("{0} + {1} | 新建击杀球\\n{0} + {1} (长按) | 在准心位置新建", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal))), Cadena personalizada("{0} + {1} | 新建弹球\\n{0} + {1} (长按) | 在准心位置新建", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal))), Cadena personalizada("{0} + {1} | 蹭留\\n{0} + {2} | 卡小", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("{0} + {1} | 新建传送门\\n{0} + {1} (长按) | 在准心位置新建", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal)))), (Jugador anfitrión).editor_modeSelect)), If-Then-Else(Global.EditorMoveItem, Cadena personalizada("walk | move selected\\n{0} | move up\\n{1} | move down\\n{2} (hold) | move faster", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Saltar))), Valor en la matriz(Matriz(Cadena personalizada("{0} + {1} | Create New\\n{0} + {2} | Delete selected", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("{0} + {1} | Create new\\n{0} + {1} (hold)| raycast new", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal))), Cadena personalizada("{0} + {1} | Create new\\n{0} + {1} (hold)| raycast new", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal))), Cadena personalizada("{0} + {1} | multiclimb\\n{0} + {2} | createbhop", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("{0} + {1} | create new\\n{0} + {1} (hold)| raycast new", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo principal)))), (Jugador anfitrión).editor_modeSelect))), Derecha, -148, Nulo, Nulo, Color(Amarillo), Visible para y cadena, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else(Y((Jugador anfitrión).toggle_guide, No(Global.EditorMoveItem)), Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Valor en la matriz(Matriz(Matriz vacía, Cadena personalizada("{0} + {1} | 删除选中的击杀球", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("{0} + {1} | 删除选中的弹球", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo secundario))), Matriz vacía, Cadena personalizada("{0} + {1} | 删除选中的传送门", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo secundario)))), (Jugador anfitrión).editor_modeSelect), Valor en la matriz(Matriz(Matriz vacía, Cadena personalizada("{0} + {1} | delete selected", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("{0} + {1} | delete selected", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo secundario))), Matriz vacía, Cadena personalizada("{0} + {1} | delete selected", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Disparo secundario)))), (Jugador anfitrión).editor_modeSelect)), Derecha, -147, Nulo, Nulo, Color(Amarillo), Visible para y cadena, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else((Jugador anfitrión).toggle_guide, Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else(Global.EditorMoveItem, Cadena personalizada("{0} | 放置实体{1} | cancel placement\\n", Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario))), Valor en la matriz(Matriz(Cadena personalizada("{0} + {1} | 移除/新建传送点\\n{0} + {2} | 检查点碰撞模型\\n", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Recargar)), Cadena de teclas de atajo(Botón(Habilidad 1))), Cadena personalizada("{0} + {1} | 选择上一个击杀球\\n{0} + {2} | 选择下一个击杀球\\n", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Saltar))), Cadena personalizada("{0} + {1} | 选择上一个弹球\\n{0} + {2} | 选择下一个弹球\\n", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Saltar))), Cadena personalizada("{0} + {1} | 爬墙\\n{0} + {2} | 延二段跳", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Saltar))), Cadena personalizada("{0} + {1} | 选择下一个传送门\\n{0} + {2} | 选择上一个传送门\\n", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Saltar)), Cadena de teclas de atajo(Botón(Agacharse)))), (Jugador anfitrión).editor_modeSelect)), If-Then-Else(Global.EditorMoveItem, Cadena personalizada("{0} | confirm placement\\n{1} | cancel placement", Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario))), Valor en la matriz(Matriz(Cadena personalizada("{0} + {1} | Remove/Add teleport\\n{0} + {2} | Toggle Hitbox\\n", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Recargar)), Cadena de teclas de atajo(Botón(Habilidad 1))), Cadena personalizada("{0} + {1} | Select previous\\n{0} + {2} | Select next\\n", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Saltar))), Cadena personalizada("{0} + {1} | Select previous\\n{0} + {2} | Select next\\n", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Saltar))), Cadena personalizada("{0} + {1} | wallclimb\\n{0} + {2} | save double", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Saltar))), Cadena personalizada("{0} + {1} | select next\\n{0} + {2} | select previous\\n", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Saltar)), Cadena de teclas de atajo(Botón(Agacharse)))), (Jugador anfitrión).editor_modeSelect))), Derecha, -146, Nulo, Nulo, Color(Amarillo), Visible para y cadena, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else(Y((Jugador anfitrión).toggle_guide, No(Global.EditorMoveItem)), Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Valor en la matriz(Matriz(Cadena personalizada("{0} (长按) | 移动检查点", Cadena de teclas de atajo(Botón(Habilidad 2))), Cadena personalizada("{0} + {1} | 增大击杀球\\n{0} + {2} | 缩小击杀球", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Saltar)), Cadena de teclas de atajo(Botón(Agacharse))), Cadena personalizada("{0} + {1} | 增加弹球弹力\\n{0} + {2} | 减少弹球弹力", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Saltar)), Cadena de teclas de atajo(Botón(Agacharse))), Cadena personalizada("{0} + {1} | 死小\\n{0} + {2} | 表情留小", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("{0} + {1} | 移动选中的实体\\n{0} + {2} | 应用到当前/所有关卡(开关)", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Saltar)))), (Jugador anfitrión).editor_modeSelect), Valor en la matriz(Matriz(Cadena personalizada("{0} (hold) | Move", Cadena de teclas de atajo(Botón(Habilidad 2))), Cadena personalizada("{0} + {1} | Increase size\\n{0} + {2} | Decrease size", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Saltar)), Cadena de teclas de atajo(Botón(Agacharse))), Cadena personalizada("{0} + {1} | Increase strength\\n{0} + {2} | Decrease strength", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Saltar)), Cadena de teclas de atajo(Botón(Agacharse))), Cadena personalizada("{0} + {1} | death hop\\n{0} + {2} | emote", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("{0} + {1} | move\\n{0} + {2} | cp/map (toggle)", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Saltar)))), (Jugador anfitrión).editor_modeSelect)), Derecha, -145, Nulo, Nulo, Color(Amarillo), Visible para y cadena, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else(Y((Jugador anfitrión).toggle_guide, No(Global.EditorMoveItem)), Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Valor en la matriz(Matriz(Matriz vacía, Cadena personalizada("{0} + {1} | 移动选中的实体", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Disparo principal))), Cadena personalizada("{0} + {1} | 移动选中的实体", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Disparo principal))), Cadena personalizada("{0} + {1} | 留小跳进点\\n{0} + {2} | 站卡", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Saltar)), Cadena de teclas de atajo(Botón(Agacharse))), Matriz vacía), (Jugador anfitrión).editor_modeSelect), Valor en la matriz(Matriz(Matriz vacía, Cadena personalizada("{0} + {1} | Move", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Disparo principal))), Cadena personalizada("{0} + {1} | Move", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Disparo principal))), Cadena personalizada("{0} + {1} | require bhop\\n{0} + {2} | stand create", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Saltar)), Cadena de teclas de atajo(Botón(Agacharse))), Matriz vacía), (Jugador anfitrión).editor_modeSelect)), Derecha, -144, Nulo, Nulo, Color(Amarillo), Visible para y cadena, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else((Jugador anfitrión).toggle_guide, Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada(" \\n{0} + {1} | 下一关", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Disparo principal))), Cadena personalizada(" \\n{0} + {1} | Next checkpoint", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Disparo principal)))), Derecha, -150, Nulo, Nulo, If-Then-Else((Jugador anfitrión).toggle_guide, Color(Verde), Color(Naranja)), Visible para cadena y color, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else((Jugador anfitrión).toggle_guide, Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0} + {1} | 上一关\\n{2} (长按) | 飞行\\n", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Disparo secundario)), Cadena de teclas de atajo(Botón(Habilidad 1))), Cadena personalizada("{0} + {1} | Prev checkpoint\\n{2} (hold)| Fly\\n", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Disparo secundario)), Cadena de teclas de atajo(Botón(Habilidad 1)))), Derecha, -149, Nulo, Nulo, If-Then-Else((Jugador anfitrión).toggle_guide, Color(Verde), Color(Naranja)), Visible para cadena y color, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else((Jugador anfitrión).toggle_guide, Jugador anfitrión, Nulo), Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("保存地图长按 {0} + {1} + {2}", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Melé)), Cadena personalizada("{0} 后按弹出窗口的提示进行操作                                                                                                ", Cadena de teclas de atajo(Botón(Recargar)))), Cadena personalizada("to save map, hold {0} + {1} + {2}", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Melé)), Cadena personalizada("{0} then follow instructions                                                                                                ", Cadena de teclas de atajo(Botón(Recargar))))), Nulo, Izquierda, -197, Nulo, Color(Amarillo), Nulo, Visible para y cadena, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else((Jugador local).editor_saveCache, Nulo, Jugador local), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else(Botón presionado(Jugador anfitrión, Botón(Melé)), Cadena personalizada("{0} 检查点模式\\n{1} 击杀球模式\\n{2}", If-Then-Else((Jugador anfitrión).editor_modeSelect, Cadena personalizada("     "), Cadena de ícono(Flecha: Hacia la derecha)), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1), Cadena de ícono(Flecha: Hacia la derecha), Cadena personalizada("     ")), Cadena personalizada("{0} 弹球模式\\n{1} 封禁(单关)\\n{2} 自定义传送门 ", If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Cadena de ícono(Flecha: Hacia la derecha), Cadena personalizada("     ")), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 3), Cadena de ícono(Flecha: Hacia la derecha), Cadena personalizada("     ")), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4), Cadena de ícono(Flecha: Hacia la derecha), Cadena personalizada("     ")))), If-Then-Else(Comparar(Jugador local, ==, Jugador anfitrión), Cadena personalizada(" {0} {1} ", Valor en la matriz(Matriz(Cadena de ícono(Bandera), Cadena de ícono(Cráneo), Cadena de ícono(Luna), Cadena de ícono(Detener), Cadena de ícono(Espiral)), (Jugador anfitrión).editor_modeSelect), Valor en la matriz(Matriz(Cadena personalizada("检查点模式"), Cadena personalizada("击杀球模式"), Cadena personalizada("弹球模式"), Cadena personalizada("封禁(单关)"), Cadena personalizada("自定义传送门")), (Jugador anfitrión).editor_modeSelect)), Cadena personalizada(" {0} 源氏 编辑者 {0} ", Cadena de ícono(Rayo)))), If-Then-Else(Botón presionado(Jugador anfitrión, Botón(Melé)), Cadena personalizada("{0} checkpoints\\n{1} boundary spheres\\n{2}", If-Then-Else((Jugador anfitrión).editor_modeSelect, Cadena personalizada("     "), Cadena de ícono(Flecha: Hacia la derecha)), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1), Cadena de ícono(Flecha: Hacia la derecha), Cadena personalizada("     ")), Cadena personalizada("{0} function orbs\\n{1} skill bans\\n{2} portals", If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Cadena de ícono(Flecha: Hacia la derecha), Cadena personalizada("     ")), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 3), Cadena de ícono(Flecha: Hacia la derecha), Cadena personalizada("     ")), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4), Cadena de ícono(Flecha: Hacia la derecha), Cadena personalizada("     ")))), If-Then-Else(Comparar(Jugador local, ==, Jugador anfitrión), Cadena personalizada(" {0} {1} ", Valor en la matriz(Matriz(Cadena de ícono(Bandera), Cadena de ícono(Cráneo), Cadena de ícono(Luna), Cadena de ícono(Detener), Cadena de ícono(Espiral)), (Jugador anfitrión).editor_modeSelect), Valor en la matriz(Matriz(Cadena personalizada("checkpoints"), Cadena personalizada("boundary spheres"), Cadena personalizada("function orbs"), Cadena personalizada("skill bans"), Cadena personalizada("portals")), (Jugador anfitrión).editor_modeSelect)), Cadena personalizada(" {0} Genji editor {0} ", Cadena de ícono(Rayo))))), Nulo, Nulo, Arriba, -174, Color(Azul), Nulo, Nulo, Visible para y cadena, Visibilidad predeterminada);
            Crear texto del HUD(Primero de(Verdadero), Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else(Comparar(Jugador local, ==, Jugador anfitrión), Cadena personalizada("{0} + 射击 | 切换作图模式", Cadena de teclas de atajo(Botón(Melé))), Cadena personalizada("房主/编辑者 {0}", Jugador anfitrión)), If-Then-Else(Comparar(Jugador local, ==, Jugador anfitrión), Cadena personalizada("{0} + shoot | change mode", Cadena de teclas de atajo(Botón(Melé))), Cadena personalizada("Current host/editor: {0}", Jugador anfitrión))), Nulo, Arriba, -175, Nulo, If-Then-Else((Jugador local).editor_lock, Color(Gris), Color(Blanco)), Nulo, Visible para cadena y color, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else(Y((Jugador anfitrión).toggle_guide, O(No((Jugador anfitrión).editor_modeSelect), Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Conteo de((Jugador anfitrión).editor_bounceIndex)))), Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0} + {1} | {2}", Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena personalizada("{0} {1} | {2}                                                                                                ", If-Then-Else((Jugador anfitrión).editor_modeSelect, Cadena personalizada("弹球给刀"), Cadena personalizada("检查点给刀")), Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad máxima)), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Valor en la matriz(Global.TQ5, Global.EditSelected), La matriz contiene(Global.Dao, (Jugador anfitrión).checkpoint_current)))), Cadena personalizada("{0} + {1} | {2}", Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena personalizada("{0} give ult {1} | {2}                                                                                                ", If-Then-Else((Jugador anfitrión).editor_modeSelect, Cadena personalizada("Orb"), Cadena personalizada("Level")), Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad máxima)), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Valor en la matriz(Global.TQ5, Global.EditSelected), La matriz contiene(Global.Dao, (Jugador anfitrión).checkpoint_current))))), Izquierda, -189, Nulo, Nulo, If-Then-Else(Y(Valor en la matriz(Global.TQ5, Global.EditSelected), Comparar((Jugador anfitrión).editor_modeSelect, ==, 2)), Color(Verde), If-Then-Else(Y(La matriz contiene(Global.Dao, (Jugador anfitrión).checkpoint_current), No((Jugador anfitrión).editor_modeSelect)), Color(Verde), Color(Naranja))), Visible para cadena y color, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else(Y((Jugador anfitrión).toggle_guide, O(No((Jugador anfitrión).editor_modeSelect), Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Conteo de((Jugador anfitrión).editor_bounceIndex)))), Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0} + {1} | {2}", Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Disparo secundario)), Cadena personalizada("{0} {1} | {2}                                                                                                ", If-Then-Else((Jugador anfitrión).editor_modeSelect, Cadena personalizada("弹球给Shift"), Cadena personalizada("检查点给Shift")), Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad 1)), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Valor en la matriz(Global.TQ6, Global.EditSelected), La matriz contiene(Global.SHIFT, (Jugador anfitrión).checkpoint_current)))), Cadena personalizada("{0} + {1} | {2}", Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Disparo secundario)), Cadena personalizada("{0} give dash {1} | {2}                                                                                                ", If-Then-Else((Jugador anfitrión).editor_modeSelect, Cadena personalizada("Orb"), Cadena personalizada("Level")), Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad 1)), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Valor en la matriz(Global.TQ6, Global.EditSelected), La matriz contiene(Global.SHIFT, (Jugador anfitrión).checkpoint_current))))), Izquierda, -188, Nulo, Nulo, If-Then-Else(Y(Valor en la matriz(Global.TQ6, Global.EditSelected), Comparar((Jugador anfitrión).editor_modeSelect, ==, 2)), Color(Verde), If-Then-Else(Y(La matriz contiene(Global.SHIFT, (Jugador anfitrión).checkpoint_current), No((Jugador anfitrión).editor_modeSelect)), Color(Verde), Color(Naranja))), Visible para cadena y color, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else(Y(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), (Jugador anfitrión).toggle_guide), Conteo de((Jugador anfitrión).editor_bounceIndex)), Jugador anfitrión, Nulo), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0} + {1} |  收集球(进点前必须集齐) {2}", Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena personalizada("{0} | {1}\\n                                                                                                ", Cadena de ícono(Asterisco), Valor en la matriz(Global.BounceToggleLock, Global.EditSelected))), Cadena personalizada("{0} + {1} | unlocks checkpoint {2}", Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena personalizada("{0} | {1}\\n                                                                                                ", Cadena de ícono(Asterisco), Valor en la matriz(Global.BounceToggleLock, Global.EditSelected)))), Izquierda, -187, Nulo, Nulo, If-Then-Else(Valor en la matriz(Global.BounceToggleLock, Global.EditSelected), Color(Verde), Color(Naranja)), Visible para cadena y color, Visibilidad predeterminada);
            Crear texto del HUD(If-Then-Else((Jugador anfitrión).toggle_guide, Jugador anfitrión, Nulo), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("球体/传送门上限: {0}/193 ", Agregar(Agregar(Conteo de(Global.TQ), Conteo de(Global.H)), Conteo de(Global.CustomPortalStart))), Cadena personalizada("orb/portal limit: {0}/193 ", Agregar(Agregar(Conteo de(Global.TQ), Conteo de(Global.H)), Conteo de(Global.CustomPortalStart)))), Nulo, Cadena personalizada("                                                                                                                                "), Izquierda, -191, Color(Azul), Nulo, Nulo, Visible para y cadena, Visibilidad predeterminada);
            "display selected cc/orb info"
            Crear texto del HUD(If-Then-Else((Jugador anfitrión).toggle_guide, Jugador anfitrión, Nulo), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else(Y(No((Jugador anfitrión).editor_modeSelect), Conteo de(Global.A)), Cadena personalizada("\\n 选中的检查点 \\n 矢量: {0}{1} \\n", Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), If-Then-Else(Comparar(Conteo de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), <, 2), Matriz vacía, Cadena personalizada("\\n 传送点: {0}", Valor en la matriz(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), Verdadero)))), If-Then-Else(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1), Conteo de((Jugador anfitrión).editor_killIndex)), Cadena personalizada("\\n 选中的击杀球\\n 矢量: {0}\\n 半径: {1}\\n  + 進不去\\n  - 出不來\\n", Valor en la matriz(Global.H, Global.EditSelected), Valor en la matriz(Global.I, Global.EditSelected)), If-Then-Else(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Conteo de((Jugador anfitrión).editor_bounceIndex)), Cadena personalizada("\\n 选中的弹球\\n 矢量: {0}\\n 弹力: {1}\\n 序号: {2}\\n", Valor en la matriz(Global.TQ, Global.EditSelected), Valor en la matriz(Global.EditMode, Global.EditSelected), Global.EditSelected), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 3), Cadena personalizada("\\n 封禁(单关)\\n――――――――――――\\n {0} 蹭留 ∞\\n {1} 卡小 ♂\\n {2}", If-Then-Else(La matriz contiene(Global.BanMulti, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), If-Then-Else(La matriz contiene(Global.BanCreate, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), Cadena personalizada("{0} 站卡 ♠\\n {1} 爬墙 ↑\\n {2}", If-Then-Else(La matriz contiene(Global.BanStand, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), If-Then-Else(La matriz contiene(Global.BanClimb, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), Cadena personalizada("{0} 死小 X\\n {1} 表情留小 ♥\\n {2}", If-Then-Else(La matriz contiene(Global.BanDead, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), If-Then-Else(La matriz contiene(Global.BanEmote, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), Cadena personalizada("{0} 延二段跳 △\\n――――――――――――\\n {1} 留小跳进点 ≥\\n", If-Then-Else(La matriz contiene(Global.BanSaveDouble, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), If-Then-Else(La matriz contiene(Global.BanBhop, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía))))), If-Then-Else(Y(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4), La matriz contiene(Matriz((Jugador anfitrión).checkpoint_current, -1), Valor en la matriz(Global.CustomPortalCP, Global.EditSelected))), Conteo de(Global.CustomPortalCP)), Cadena personalizada("\\n 入口矢量: {0}\\n 出口矢量: {1}\\n 应用关卡: {2}\\n", Valor en la matriz(Global.CustomPortalStart, Global.EditSelected), Valor en la matriz(Global.CustomPortalEndpoint, Global.EditSelected), If-Then-Else(Comparar(Valor en la matriz(Global.CustomPortalCP, Global.EditSelected), <, Nulo), Cadena personalizada("所有"), (Jugador anfitrión).checkpoint_current)), Cadena personalizada("\\n   当前无数据选中   \\n")))))), If-Then-Else(Y(No((Jugador anfitrión).editor_modeSelect), Conteo de(Global.A)), Cadena personalizada("\\n Selected Checkpoint\\n Vector: {0}{1} \\n", Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), If-Then-Else(Comparar(Conteo de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), <, 2), Matriz vacía, Cadena personalizada("\\n Teleport: {0}", Valor en la matriz(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), Verdadero)))), If-Then-Else(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1), Conteo de((Jugador anfitrión).editor_killIndex)), Cadena personalizada("\\n Selected boundary sphere\\n Vector: {0}\\n radius: {1}\\n  + keep out\\n  - stay in\\n", Valor en la matriz(Global.H, Global.EditSelected), Valor en la matriz(Global.I, Global.EditSelected)), If-Then-Else(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Conteo de((Jugador anfitrión).editor_bounceIndex)), Cadena personalizada("\\n Selected Bounce Orb\\n Vector: {0}\\n strength: {1} \\n ID: {2}\\n", Valor en la matriz(Global.TQ, Global.EditSelected), Valor en la matriz(Global.EditMode, Global.EditSelected), Global.EditSelected), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 3), Cadena personalizada("\\n skill bans\\n――――――――――――\\n {0} multi-climb ∞\\n {1} create ♂\\n {2}", If-Then-Else(La matriz contiene(Global.BanMulti, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), If-Then-Else(La matriz contiene(Global.BanCreate, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), Cadena personalizada("{0} stand ♠\\n {1} climb ↑\\n {2}", If-Then-Else(La matriz contiene(Global.BanStand, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), If-Then-Else(La matriz contiene(Global.BanClimb, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), Cadena personalizada("{0} dead X\\n {1} emote ♥\\n {2}", If-Then-Else(La matriz contiene(Global.BanDead, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), If-Then-Else(La matriz contiene(Global.BanEmote, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), Cadena personalizada("{0} save double △\\n――――――――――――\\n {1} require bhop ≥\\n", If-Then-Else(La matriz contiene(Global.BanSaveDouble, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía), If-Then-Else(La matriz contiene(Global.BanBhop, (Jugador anfitrión).checkpoint_current), Cadena personalizada("√"), Matriz vacía))))), If-Then-Else(Y(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4), La matriz contiene(Matriz((Jugador anfitrión).checkpoint_current, -1), Valor en la matriz(Global.CustomPortalCP, Global.EditSelected))), Conteo de(Global.CustomPortalCP)), Cadena personalizada("\\n Start: {0} \\n End: {1} \\n CP: {2} \\n", Valor en la matriz(Global.CustomPortalStart, Global.EditSelected), Valor en la matriz(Global.CustomPortalEndpoint, Global.EditSelected), If-Then-Else(Comparar(Valor en la matriz(Global.CustomPortalCP, Global.EditSelected), <, Nulo), Cadena personalizada("All"), (Jugador anfitrión).checkpoint_current)), Cadena personalizada("\\n   No data selected   \\n"))))))), Nulo, Cadena personalizada("                                                                                                                                "), Izquierda, -190, Color(Blanco), Nulo, Color(Naranja), Visible para y cadena, Visibilidad predeterminada);
            Esperar(Verdadero, Ignorar condición);
            "effects =========================================================================================================================================================================="
            Crear texto dentro del mundo(If-Then-Else(Conteo de(Global.EditSelectIdArray), Verdadero, Nulo), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("选中的实体"), Cadena personalizada("selected")), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1), Valor en la matriz(Global.H, Global.EditSelected), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Valor en la matriz(Global.TQ, Global.EditSelected), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4), Valor en la matriz(Global.CustomPortalStart, Global.EditSelected), Nulo))), 1.2, No atravesar, Visible para y posición, Color(Naranja), Visibilidad predeterminada);
            Crear ícono(If-Then-Else(Conteo de(Global.EditSelectIdArray), Verdadero, Nulo), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1), Valor en la matriz(Global.H, Global.EditSelected), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Valor en la matriz(Global.TQ, Global.EditSelected), If-Then-Else(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4), Valor en la matriz(Global.CustomPortalStart, Global.EditSelected), Nulo))), Flecha: Hacia abajo, Visible para y posición, Color(Blanco), Verdadero);
            "Purple sphere for teleport location"
            Crear efecto(If-Then-Else(Y(Comparar(Conteo de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), >, 1), No((Jugador anfitrión).editor_modeSelect)), Verdadero, Nulo), Esfera, Color(Morado), Restar(Valor en la matriz(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), Verdadero), Multiplicar(0.1, Arriba)), 0.2, Visible para posición y radio);
            "Teleport text"
            Crear texto dentro del mundo(If-Then-Else(Y(Comparar(Conteo de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), >, 1), No((Jugador anfitrión).editor_modeSelect)), Verdadero, Nulo), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("传送点位置"), Cadena personalizada("teleporter location")), Valor en la matriz(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), Verdadero), 1.6, No atravesar, Visible para posición y cadena, Color(Azul cielo), Visibilidad predeterminada);
            "normal cp if teleport"
            Crear efecto(If-Then-Else(Y(Valor en la matriz(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), Verdadero), No((Jugador anfitrión).editor_modeSelect)), Jugador anfitrión, Nulo), Anillo, Color(Naranja), Primero de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), Verdadero, Visible para posición y radio);
            Crear texto dentro del mundo(If-Then-Else(Y(Valor en la matriz(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), Verdadero), No((Jugador anfitrión).editor_modeSelect)), Jugador anfitrión, Nulo), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("检查点位置"), Cadena personalizada("level location")), Primero de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), 1.6, No atravesar, Visible para posición y cadena, Color(Azul cielo), Visibilidad predeterminada);
            "portal fx"
            Crear efecto(If-Then-Else(Y(Conteo de(Global.EditSelectIdArray), Comparar((Jugador anfitrión).editor_modeSelect, ==, 4)), Jugador anfitrión, Nulo), Chispas, Color(Morado), Valor en la matriz(Global.CustomPortalEndpoint, Global.EditSelected), 0.2, Visible para posición y radio);
        "Editor Off"
        Si no;
            "clear variables if not in editor mode"
            Establecer variable global(HudStoreEdit, Nulo);
    }
}

regla ("Editor |  Fly/Noclip Toggle") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        (Jugador del evento).editor_on != Falso;
        Botón presionado(Jugador del evento, Botón(Habilidad 1)) == Verdadero;
        (Jugador del evento).editor_fly == Nulo;
        Y(Global.EditorMoveItem, Comparar(Jugador del evento, ==, Jugador anfitrión)) == Falso;
    }
    acciones {
        Esperar hasta(O(Botón presionado(Jugador del evento, Botón(Recargar)), No(Botón presionado(Jugador del evento, Botón(Habilidad 1)))), 0.7);
        Si(O(Botón presionado(Jugador del evento, Botón(Recargar)), No(Botón presionado(Jugador del evento, Botón(Habilidad 1)))));
            Esperar(Falso, Ignorar condición);
            Abortar;
        Fin;
        Establecer variable de jugador(Jugador del evento, editor_fly, Agregar(Posición de(Jugador del evento), Arriba));
        Comenzar a forzar la posición del jugador(Jugador del evento, (Jugador del evento).editor_fly, Verdadero);
        Deshabilitar colisión de movimiento con entorno(Jugador del evento, Verdadero);
        Deshabilitar botón(Jugador del evento, Botón(Habilidad máxima));
        Esperar hasta(No(Botón presionado(Jugador del evento, Botón(Habilidad 1))), Verdadero);
        Mientras(Y(Y(Está vivo(Jugador del evento), (Jugador del evento).editor_fly), No(Botón presionado(Jugador del evento, Botón(Habilidad 1)))));
            Si(O(Comparar(Jugador del evento, !=, Jugador anfitrión), No((Jugador del evento).editor_lock)));
                Modificar variable de jugador(Jugador del evento, editor_fly, Agregar, Multiplicar(Restar(Agregar(0.096, Multiplicar(0.192, Botón presionado(Jugador del evento, Botón(Saltar)))), Multiplicar(0.048, Botón presionado(Jugador del evento, Botón(Agacharse)))), Agregar(Agregar(Multiplicar(Multiplicar(Dirección de orientación de(Jugador del evento), Componente Z de(Aceleración de(Jugador del evento))), Vector(Verdadero, No(Botón presionado(Jugador del evento, Botón(Habilidad 1))), Verdadero)), Vector global de(Multiplicar(Aceleración de(Jugador del evento), Izquierda), Jugador del evento, Rotación)), Multiplicar(Arriba, Restar(Botón presionado(Jugador del evento, Botón(Habilidad 2)), Botón presionado(Jugador del evento, Botón(Habilidad máxima)))))));
            Si no si(No((Jugador anfitrión).editor_modeSelect));
                Modificar variable de jugador(Jugador del evento, editor_fly, Agregar, Multiplicar(Agregar(0.00288, Multiplicar(0.09312, Botón presionado(Jugador del evento, Botón(Disparo principal)))), Agregar(Agregar(Multiplicar(Dirección de orientación de(Jugador del evento), Componente Z de(Aceleración de(Jugador del evento))), Vector global de(Multiplicar(Aceleración de(Jugador del evento), Izquierda), Jugador del evento, Rotación)), Multiplicar(Arriba, Restar(Botón presionado(Jugador del evento, Botón(Saltar)), Botón presionado(Jugador del evento, Botón(Agacharse)))))));
            Fin;
            Esperar(Falso, Ignorar condición);
        Fin;
        Habilitar botón(Jugador del evento, Botón(Habilidad máxima));
        Habilitar colisión de movimiento con entorno(Jugador del evento);
        Establecer variable de jugador(Jugador del evento, editor_fly, Nulo);
        Dejar de forzar la posición del jugador(Jugador del evento);
        Esperar(Verdadero, Ignorar condición);
    }
}

regla ("Editor | change mode") {
    evento {
        En curso - Global;
    }
    condiciones {
        "@Event eachPlayer\\n@Condition eventPlayer == hostPlayer"
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_lock == Falso;
        Botón presionado(Jugador anfitrión, Botón(Melé)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Disparo principal)) != Botón presionado(Jugador anfitrión, Botón(Disparo secundario));
    }
    acciones {
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Si(Botón presionado(Jugador anfitrión, Botón(Disparo principal)));
            Modificar variable de jugador(Jugador anfitrión, editor_modeSelect, Agregar, 4);
        Si no;
            Modificar variable de jugador(Jugador anfitrión, editor_modeSelect, Agregar, Verdadero);
        Fin;
        Modificar variable de jugador(Jugador anfitrión, editor_modeSelect, Módulo, 5);
        Llamada a subrutina(EditUpdateSelectedIds);
        Llamada a subrutina(EditorSelectLast);
        Esperar(Falso, Ignorar condición);
        Esperar hasta(Comparar(Botón presionado(Jugador anfitrión, Botón(Disparo principal)), ==, Botón presionado(Jugador anfitrión, Botón(Disparo secundario))), 0.1);
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
    }
}

regla ("Editor | update selected id") {
    evento {
        Subrutina;
        EditUpdateSelectedIds;
    }
    acciones {
        Si(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1));
            Establecer variable global(EditSelectIdArray, Matriz mapeada(Global.killballnumber, Índice de matriz actual));
            Establecer variable global(EditSelectIdArray, Matriz filtrada(Global.EditSelectIdArray, Comparar(Valor en la matriz(Global.killballnumber, Elemento de matriz actual), ==, (Jugador anfitrión).checkpoint_current)));
        Si no si(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2));
            Establecer variable global(EditSelectIdArray, Matriz mapeada(Global.pinballnumber, Índice de matriz actual));
            Establecer variable global(EditSelectIdArray, Matriz filtrada(Global.EditSelectIdArray, Comparar(Valor en la matriz(Global.pinballnumber, Elemento de matriz actual), ==, (Jugador anfitrión).checkpoint_current)));
        Si no si(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4));
            Establecer variable global(EditSelectIdArray, Matriz mapeada(Global.CustomPortalCP, Índice de matriz actual));
            Establecer variable global(EditSelectIdArray, Matriz filtrada(Global.EditSelectIdArray, O(Comparar(Valor en la matriz(Global.CustomPortalCP, Elemento de matriz actual), <, Nulo), Comparar(Valor en la matriz(Global.CustomPortalCP, Elemento de matriz actual), ==, (Jugador anfitrión).checkpoint_current))));
        Si no;
            Establecer variable global(EditSelectIdArray, Matriz vacía);
        Fin;
    }
}

regla ("Editor | select last") {
    evento {
        Subrutina;
        EditorSelectLast;
    }
    acciones {
        Establecer variable global(EditSelected, Último de(Global.EditSelectIdArray));
    }
}

regla ("Editor | create cp/orb") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "Required for UpdateCache()"
        Jugador del evento == Jugador anfitrión;
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_lock == Falso;
        La matriz contiene(Matriz(Nulo, 1, 2, 4), (Jugador anfitrión).editor_modeSelect) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Interactuar)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Disparo principal)) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Si(No((Jugador anfitrión).editor_modeSelect));
            Si(Y(Conteo de(Global.A), Comparar(Distancia entre(Jugador anfitrión, Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), <=, 1.4)));
                Mensaje pequeño(Jugador anfitrión, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   放置的检查点距离太近"), Cadena personalizada("   Cannot place checkpoint too close.")));
            Si no;
                "$$"
                Si(Comparar((Jugador anfitrión).checkpoint_current, >=, Restar(Conteo de(Global.A), Verdadero)));
                    Establecer variable de jugador(Jugador anfitrión, checkpoint_current, Restar(Conteo de(Global.A), Verdadero));
                Fin;
                Si(Comparar((Jugador anfitrión).checkpoint_current, ==, Restar(Conteo de(Global.A), Verdadero)));
                    Modificar variable global(A, Anexar a la matriz, Posición de(Jugador anfitrión));
                    Modificar variable de jugador(Jugador anfitrión, checkpoint_current, Agregar, Verdadero);
                Si no;
                    Modificar variable global(A, Anexar a la matriz, Posición de(Jugador anfitrión));
                    Establecer variable global(A, Matriz mapeada(Global.A, If-Then-Else(Comparar(Índice de matriz actual, <, Agregar((Jugador anfitrión).checkpoint_current, Verdadero)), Elemento de matriz actual, If-Then-Else(Comparar(Índice de matriz actual, ==, Agregar((Jugador anfitrión).checkpoint_current, Verdadero)), Último de(Global.A), Valor en la matriz(Global.A, Restar(Índice de matriz actual, Verdadero))))));
                    Modificar variable de jugador(Jugador anfitrión, checkpoint_current, Agregar, Verdadero);
                    Establecer variable global(killballnumber, Matriz mapeada(Global.killballnumber, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(pinballnumber, Matriz mapeada(Global.pinballnumber, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(CustomPortalCP, Matriz mapeada(Global.CustomPortalCP, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(Dao, Matriz mapeada(Global.Dao, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(SHIFT, Matriz mapeada(Global.SHIFT, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(BanMulti, Matriz mapeada(Global.BanMulti, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(BanCreate, Matriz mapeada(Global.BanCreate, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(BanStand, Matriz mapeada(Global.BanStand, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(BanDead, Matriz mapeada(Global.BanDead, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(BanEmote, Matriz mapeada(Global.BanEmote, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(BanClimb, Matriz mapeada(Global.BanClimb, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(BanSaveDouble, Matriz mapeada(Global.BanSaveDouble, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(BanBhop, Matriz mapeada(Global.BanBhop, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                    Establecer variable global(BanDjump, Matriz mapeada(Global.BanDjump, Agregar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
                Fin;
                Llamada a subrutina(UpdateCache);
                Mensaje pequeño(Jugador anfitrión, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   新检查点已创建"), Cadena personalizada("   New checkpoint created")));
            Fin;
        Si no si(No(Conteo de(Global.A)));
            Mensaje pequeño(Jugador anfitrión, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   请先放置检查点"), Cadena personalizada("   Make a checkpoint first")));
        Si no si(Comparar(Agregar(Agregar(Conteo de(Global.TQ), Conteo de(Global.H)), Conteo de(Global.CustomPortalStart)), >=, 193));
            Mensaje grande(Jugador anfitrión, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("当前地图弹球/传送门数量已达上限"), Cadena personalizada("Orb/portal limit reached for this map")));
        Si no si(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1));
            Modificar variable global(H, Anexar a la matriz, Posición de(Jugador anfitrión));
            Modificar variable global(killballnumber, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
            Modificar variable global(I, Anexar a la matriz, 5);
            "to create the fx properly"
            Llamada a subrutina(EditUpdateSelectedIds);
            Llamada a subrutina(EditorSelectLast);
            Crear efecto(Matriz filtrada(Todos los jugadores(Todos los equipos), Comparar((Elemento de matriz actual).checkpoint_current, ==, Valor en la matriz(Global.killballnumber, Evaluar una vez(Global.EditSelected)))), Esfera, Valor en la matriz(Global.ColorConfig, 14), Valor en la matriz(Global.H, Evaluar una vez(Global.EditSelected)), Valor absoluto(Valor en la matriz(Global.I, Evaluar una vez(Global.EditSelected))), Visible para posición y radio);
            Modificar variable global(K, Anexar a la matriz, Última entidad creada);
            Mensaje grande(Primero de(Verdadero), Cadena personalizada("{0} {1}", If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("新击杀球已创建! \\n仅生效于检查点"), Cadena personalizada("New boundary sphere has been created! \\nOnly valid for this checkpoint")), (Jugador anfitrión).checkpoint_current));
            Esperar hasta(No(Y(Botón presionado(Jugador anfitrión, Botón(Interactuar)), Botón presionado(Jugador anfitrión, Botón(Disparo principal)))), Verdadero);
            "EditUpdateSelectedIds() # to arrow during the placement properly"
            Mientras(Y(Botón presionado(Jugador anfitrión, Botón(Interactuar)), Botón presionado(Jugador anfitrión, Botón(Disparo principal))));
                Establecer variable global según el índice(H, Global.EditSelected, Posición de impacto de lanzamiento de rayo(Posición de la vista(Jugador anfitrión), Agregar(Posición de la vista(Jugador anfitrión), Multiplicar(Dirección de orientación de(Jugador anfitrión), 8)), Nulo, Nulo, Falso));
                Esperar(Falso, Ignorar condición);
            Fin;
            "UpdateCache()"
            Establecer variable global(EditorMoveItem, Verdadero);
        Si no si(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2));
            Modificar variable global(TQ, Anexar a la matriz, Posición de(Jugador anfitrión));
            Modificar variable global(pinballnumber, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
            Modificar variable global(EditMode, Anexar a la matriz, 10);
            Modificar variable global(TQ5, Anexar a la matriz, Falso);
            Modificar variable global(TQ6, Anexar a la matriz, Falso);
            Modificar variable global(BounceToggleLock, Anexar a la matriz, Falso);
            Llamada a subrutina(EditUpdateSelectedIds);
            Llamada a subrutina(EditorSelectLast);
            Crear efecto(Matriz filtrada(Anexar a la matriz(Todos los jugadores(Todos los equipos), Nulo), Y(Comparar((Elemento de matriz actual).checkpoint_current, ==, Valor en la matriz(Global.pinballnumber, Evaluar una vez(Global.EditSelected))), No(La matriz contiene((Elemento de matriz actual).cache_collectedLocks, Evaluar una vez(Global.EditSelected))))), Orbe, If-Then-Else(Valor en la matriz(Global.BounceToggleLock, Evaluar una vez(Global.EditSelected)), Valor en la matriz(Global.ColorConfig, 16), Valor en la matriz(Global.ColorConfig, 15)), Valor en la matriz(Global.TQ, Evaluar una vez(Global.EditSelected)), Verdadero, Visible para posición radio y color);
            Modificar variable global(TQ2, Anexar a la matriz, Última entidad creada);
            Mensaje grande(Primero de(Verdadero), Cadena personalizada("{0} {1}", If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("新弹球已创建! \\n仅生效于检查点"), Cadena personalizada("New Bounce Orb has been created! \\nOnly valid for this checkpoint")), (Jugador anfitrión).checkpoint_current));
            Esperar hasta(No(Y(Botón presionado(Jugador anfitrión, Botón(Interactuar)), Botón presionado(Jugador anfitrión, Botón(Disparo principal)))), Verdadero);
            Mientras(Y(Botón presionado(Jugador anfitrión, Botón(Interactuar)), Botón presionado(Jugador anfitrión, Botón(Disparo principal))));
                Establecer variable global según el índice(TQ, Global.EditSelected, Posición de impacto de lanzamiento de rayo(Posición de la vista(Jugador anfitrión), Agregar(Posición de la vista(Jugador anfitrión), Multiplicar(Dirección de orientación de(Jugador anfitrión), 7)), Nulo, Nulo, Falso));
                Esperar(Falso, Ignorar condición);
            Fin;
            "UpdateCache()"
            Establecer variable global(EditorMoveItem, Verdadero);
        Si no si(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4));
            Modificar variable global(CustomPortalStart, Anexar a la matriz, Posición de(Jugador anfitrión));
            Modificar variable global(CustomPortalEndpoint, Anexar a la matriz, Agregar(Posición de(Jugador anfitrión), Multiplicar(10, Arriba)));
            Modificar variable global(CustomPortalCP, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
            Llamada a subrutina(EditUpdateSelectedIds);
            Llamada a subrutina(EditorSelectLast);
            Crear efecto(Matriz filtrada(Todos los jugadores(Todos los equipos), O(Comparar(Valor en la matriz(Global.CustomPortalCP, Evaluar una vez(Global.EditSelected)), ==, (Elemento de matriz actual).checkpoint_current), Comparar(Valor en la matriz(Global.CustomPortalCP, Evaluar una vez(Global.EditSelected)), <, Nulo))), Buena aura, Valor en la matriz(Global.ColorConfig, 17), Valor en la matriz(Global.CustomPortalStart, Evaluar una vez(Global.EditSelected)), 0.6, Visible para posición radio y color);
            Modificar variable global(PortalEffects, Anexar a la matriz, Última entidad creada);
            Establecer variable global(EditSelected, Restar(Conteo de(Global.CustomPortalStart), Verdadero));
            Esperar hasta(No(Y(Botón presionado(Jugador anfitrión, Botón(Interactuar)), Botón presionado(Jugador anfitrión, Botón(Disparo principal)))), Verdadero);
            "EditUpdateSelectedIds()"
            Mientras(Y(Botón presionado(Jugador anfitrión, Botón(Interactuar)), Botón presionado(Jugador anfitrión, Botón(Disparo principal))));
                Establecer variable global según el índice(CustomPortalStart, Global.EditSelected, Posición de impacto de lanzamiento de rayo(Posición de la vista(Jugador anfitrión), Agregar(Posición de la vista(Jugador anfitrión), Multiplicar(Dirección de orientación de(Jugador anfitrión), 6)), Nulo, Nulo, Falso));
                Esperar(Falso, Ignorar condición);
            Fin;
            Mensaje grande(Primero de(Verdadero), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("新传送门已创建!\\n生效于当前检查点"), Cadena personalizada("Portal created \\nOnly valid for this checkpoint")));
            Establecer variable global(EditorMoveItem, Verdadero);
        Fin;
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
        Esperar(0.64, Ignorar condición);
    }
}

regla ("Editor | delete cp/orb/portal") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "Required for UpdateCache()"
        Jugador del evento == Jugador anfitrión;
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_lock == Falso;
        Botón presionado(Jugador anfitrión, Botón(Interactuar)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Disparo secundario)) == Verdadero;
    }
    acciones {
        "@Condition EditorMoveItem == false\\n@Condition len(EditSelectIdArray) > 0"
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Si(Y(No((Jugador anfitrión).editor_modeSelect), Conteo de(Global.A)));
            "Resync Kill Orbs =================="
            Establecer variable de jugador(Jugador anfitrión, editor_temp, Matriz filtrada(Matriz mapeada(Global.killballnumber, If-Then-Else(Comparar(Elemento de matriz actual, ==, (Jugador anfitrión).checkpoint_current), Índice de matriz actual, -1)), Comparar(Elemento de matriz actual, >=, Nulo)));
            "hostPlayer.editor_temp = [i for e, i in KillballCheckpoints if e == hostPlayer.checkpoint_current]"
            Para variable global(NANBA, 0, Conteo de((Jugador anfitrión).editor_temp), Verdadero);
                Destruir efecto(Valor en la matriz(Global.K, Valor en la matriz((Jugador anfitrión).editor_temp, Global.NANBA)));
                Modificar variable global(K, Eliminar de la matriz por índice, Valor en la matriz((Jugador anfitrión).editor_temp, Global.NANBA));
                Esperar(Falso, Ignorar condición);
            Fin;
            Modificar variable global(killballnumber, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            "Decrement checkpoints after removed one"
            Establecer variable global(killballnumber, Matriz mapeada(Global.killballnumber, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            "Remove Radii at Checkpoint indexes (temp)"
            Establecer variable global(I, Matriz filtrada(Global.I, No(La matriz contiene((Jugador anfitrión).editor_temp, Índice de matriz actual))));
            Establecer variable global(H, Matriz filtrada(Global.H, No(La matriz contiene((Jugador anfitrión).editor_temp, Índice de matriz actual))));
            "Resync Bounce Orbs =============="
            Establecer variable de jugador(Jugador anfitrión, editor_temp, Matriz filtrada(Matriz mapeada(Global.pinballnumber, If-Then-Else(Comparar(Elemento de matriz actual, ==, (Jugador anfitrión).checkpoint_current), Índice de matriz actual, -1)), Comparar(Elemento de matriz actual, >=, Nulo)));
            "hostPlayer.editor_temp = [i for e, i in BouncePadCheckpoints if e == hostPlayer.checkpoint_current]"
            Para variable global(NANBA, 0, Conteo de((Jugador anfitrión).editor_temp), Verdadero);
                Destruir efecto(Valor en la matriz(Global.TQ2, Valor en la matriz((Jugador anfitrión).editor_temp, Global.NANBA)));
                Modificar variable global(TQ2, Eliminar de la matriz por índice, Valor en la matriz((Jugador anfitrión).editor_temp, Global.NANBA));
                Esperar(Falso, Ignorar condición);
            Fin;
            Modificar variable global(pinballnumber, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            "Decrement checkpoints after removed one"
            Establecer variable global(pinballnumber, Matriz mapeada(Global.pinballnumber, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Establecer variable global(TQ, Matriz filtrada(Global.TQ, No(La matriz contiene((Jugador anfitrión).editor_temp, Índice de matriz actual))));
            Establecer variable global(EditMode, Matriz filtrada(Global.EditMode, No(La matriz contiene((Jugador anfitrión).editor_temp, Índice de matriz actual))));
            Establecer variable global(TQ5, Matriz filtrada(Global.TQ5, No(La matriz contiene((Jugador anfitrión).editor_temp, Índice de matriz actual))));
            Establecer variable global(TQ6, Matriz filtrada(Global.TQ6, No(La matriz contiene((Jugador anfitrión).editor_temp, Índice de matriz actual))));
            Establecer variable global(BounceToggleLock, Matriz filtrada(Global.BounceToggleLock, No(La matriz contiene((Jugador anfitrión).editor_temp, Índice de matriz actual))));
            "Resync custom portals =================="
            Establecer variable de jugador(Jugador anfitrión, editor_temp, Matriz filtrada(Matriz mapeada(Global.CustomPortalCP, If-Then-Else(Comparar(Elemento de matriz actual, ==, (Jugador anfitrión).checkpoint_current), Índice de matriz actual, -1)), Comparar(Elemento de matriz actual, >=, Nulo)));
            Para variable global(NANBA, 0, Conteo de((Jugador anfitrión).editor_temp), Verdadero);
                Destruir efecto(Valor en la matriz(Global.PortalEffects, Valor en la matriz((Jugador anfitrión).editor_temp, Global.NANBA)));
                Modificar variable global(PortalEffects, Eliminar de la matriz por índice, Valor en la matriz((Jugador anfitrión).editor_temp, Global.NANBA));
                Esperar(Falso, Ignorar condición);
            Fin;
            Modificar variable global(CustomPortalCP, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            "Decrement checkpoints after removed one"
            Establecer variable global(CustomPortalCP, Matriz mapeada(Global.CustomPortalCP, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            "Remove Radii at Checkpoint indexes (temp)"
            Establecer variable global(CustomPortalStart, Matriz filtrada(Global.CustomPortalStart, No(La matriz contiene((Jugador anfitrión).editor_temp, Índice de matriz actual))));
            Establecer variable global(CustomPortalEndpoint, Matriz filtrada(Global.CustomPortalEndpoint, No(La matriz contiene((Jugador anfitrión).editor_temp, Índice de matriz actual))));
            Establecer variable de jugador(Jugador anfitrión, editor_temp, Nulo);
            Modificar variable global(Dao, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(Dao, Matriz mapeada(Global.Dao, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(SHIFT, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(SHIFT, Matriz mapeada(Global.SHIFT, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(BanMulti, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(BanMulti, Matriz mapeada(Global.BanMulti, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(BanCreate, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(BanCreate, Matriz mapeada(Global.BanCreate, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(BanStand, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(BanStand, Matriz mapeada(Global.BanStand, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(BanDead, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(BanDead, Matriz mapeada(Global.BanDead, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(BanEmote, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(BanEmote, Matriz mapeada(Global.BanEmote, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(BanClimb, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(BanClimb, Matriz mapeada(Global.BanClimb, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(BanSaveDouble, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(BanSaveDouble, Matriz mapeada(Global.BanSaveDouble, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(BanBhop, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(BanBhop, Matriz mapeada(Global.BanBhop, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(BanDjump, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Establecer variable global(BanDjump, Matriz mapeada(Global.BanDjump, Restar(Elemento de matriz actual, If-Then-Else(Comparar(Elemento de matriz actual, >=, (Jugador anfitrión).checkpoint_current), 1, Nulo))));
            Modificar variable global(A, Eliminar de la matriz por índice, (Jugador anfitrión).checkpoint_current);
            Modificar variable global(C, Eliminar de la matriz por índice, (Jugador anfitrión).checkpoint_current);
            Establecer variable de jugador(Jugador anfitrión, checkpoint_current, Máximo(Restar((Jugador anfitrión).checkpoint_current, Verdadero), Falso));
            Llamada a subrutina(RebuildKillOrbs);
            Llamada a subrutina(RebuildBounceOrbs);
            Llamada a subrutina(RebuildPortals);
            Mensaje pequeño(Jugador anfitrión, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   检查点已删除"), Cadena personalizada("   Checkpoint has been deleted")));
        Si no si(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1), Conteo de(Global.EditSelectIdArray)));
            Modificar variable global(H, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(I, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(killballnumber, Eliminar de la matriz por índice, Global.EditSelected);
            Destruir efecto(Valor en la matriz(Global.K, Global.EditSelected));
            Modificar variable global(K, Eliminar de la matriz por índice, Global.EditSelected);
            Llamada a subrutina(RebuildKillOrbs);
        Si no si(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Conteo de(Global.EditSelectIdArray)));
            Modificar variable global(TQ, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(EditMode, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(TQ5, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(TQ6, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(BounceToggleLock, Eliminar de la matriz por índice, Global.EditSelected);
            Destruir efecto(Valor en la matriz(Global.TQ2, Global.EditSelected));
            Modificar variable global(TQ2, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(pinballnumber, Eliminar de la matriz por índice, Global.EditSelected);
            Llamada a subrutina(RebuildBounceOrbs);
        Si no si(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4), Conteo de(Global.EditSelectIdArray)));
            Destruir efecto(Valor en la matriz(Global.PortalEffects, Global.EditSelected));
            Esperar(Falso, Ignorar condición);
            Modificar variable global(CustomPortalStart, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(CustomPortalEndpoint, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(CustomPortalCP, Eliminar de la matriz por índice, Global.EditSelected);
            Modificar variable global(PortalEffects, Eliminar de la matriz por índice, Global.EditSelected);
            Llamada a subrutina(RebuildPortals);
        Si no;
            Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
            Esperar(Falso, Ignorar condición);
            Abortar;
        Fin;
        Llamada a subrutina(UpdateCache);
        Llamada a subrutina(EditorSelectLast);
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
        Esperar(Agregar(0.16, Multiplicar(Conteo de entidad, 0.007)), Ignorar condición);
    }
}

regla ("Editor | toggle orb functions") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "Required for UpdateCache()"
        Jugador del evento == Jugador anfitrión;
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_modeSelect == 2;
        (Jugador anfitrión).editor_lock == Falso;
        Conteo de(Global.EditSelectIdArray) > Nulo;
        Botón presionado(Jugador anfitrión, Botón(Habilidad máxima)) == Verdadero;
        O(O(Botón presionado(Jugador anfitrión, Botón(Disparo principal)), Botón presionado(Jugador anfitrión, Botón(Disparo secundario))), Botón presionado(Jugador anfitrión, Botón(Habilidad 2))) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Si(Botón presionado(Jugador anfitrión, Botón(Disparo principal)));
            Establecer variable global según el índice(TQ5, Global.EditSelected, No(Valor en la matriz(Global.TQ5, Global.EditSelected)));
        Si no si(Botón presionado(Jugador anfitrión, Botón(Disparo secundario)));
            Establecer variable global según el índice(TQ6, Global.EditSelected, No(Valor en la matriz(Global.TQ6, Global.EditSelected)));
        Si no;
            Establecer variable global según el índice(BounceToggleLock, Global.EditSelected, No(Valor en la matriz(Global.BounceToggleLock, Global.EditSelected)));
            Establecer variable global según el índice(EditMode, Global.EditSelected, Multiplicar(10, No(Valor en la matriz(Global.BounceToggleLock, Global.EditSelected))));
        Fin;
        Llamada a subrutina(UpdateCache);
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
        Esperar(Falso, Ignorar condición);
    }
}

regla ("Editor | orb radi/strength") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "Required for UpdateCache()"
        Jugador del evento == Jugador anfitrión;
        (Jugador anfitrión).editor_on != Falso;
        La matriz contiene(Matriz(1, 2), (Jugador anfitrión).editor_modeSelect) == Verdadero;
        (Jugador anfitrión).editor_lock == Falso;
        Conteo de(Global.EditSelectIdArray) > Nulo;
        Botón presionado(Jugador anfitrión, Botón(Habilidad 2)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Saltar)) != Botón presionado(Jugador anfitrión, Botón(Agacharse));
        Botón presionado(Jugador anfitrión, Botón(Interactuar)) == Falso;
    }
    acciones {
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Mientras(Y(Botón presionado(Jugador anfitrión, Botón(Habilidad 2)), O(Botón presionado(Jugador anfitrión, Botón(Saltar)), Botón presionado(Jugador anfitrión, Botón(Agacharse)))));
            Si(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2), Conteo de((Jugador anfitrión).editor_bounceIndex)));
                Modificar variable global según el índice(EditMode, Global.EditSelected, Agregar, If-Then-Else(Botón presionado(Jugador anfitrión, Botón(Saltar)), 0.1, -0.1));
            Si no si(Y(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1), Conteo de((Jugador anfitrión).editor_killIndex)));
                Modificar variable global según el índice(I, Global.EditSelected, Agregar, If-Then-Else(Botón presionado(Jugador anfitrión, Botón(Saltar)), 0.1, -0.1));
            Fin;
            Esperar(0.1, Ignorar condición);
        Fin;
        Llamada a subrutina(UpdateCache);
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
    }
}

regla ("Editor | select orb/portal") {
    evento {
        En curso - Global;
    }
    condiciones {
        "@Event eachPlayer\\n@Condition eventPlayer == hostPlayer"
        (Jugador anfitrión).editor_on != Falso;
        La matriz contiene(Matriz(1, 2, 4), (Jugador anfitrión).editor_modeSelect) == Verdadero;
        (Jugador anfitrión).editor_lock == Falso;
        Conteo de(Global.EditSelectIdArray) > Nulo;
        Botón presionado(Jugador anfitrión, Botón(Interactuar)) == Verdadero;
        O(Botón presionado(Jugador anfitrión, Botón(Agacharse)), Botón presionado(Jugador anfitrión, Botón(Saltar))) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Si(Botón presionado(Jugador anfitrión, Botón(Agacharse)));
            Establecer variable global(EditSelected, If-Then-Else(Índice del valor de la matriz(Global.EditSelectIdArray, Global.EditSelected), Valor en la matriz(Global.EditSelectIdArray, Restar(Índice del valor de la matriz(Global.EditSelectIdArray, Global.EditSelected), Verdadero)), Último de(Global.EditSelectIdArray)));
        Si no;
            Establecer variable global(EditSelected, If-Then-Else(Comparar(Índice del valor de la matriz(Global.EditSelectIdArray, Global.EditSelected), ==, Restar(Conteo de(Global.EditSelectIdArray), Verdadero)), Primero de(Global.EditSelectIdArray), Valor en la matriz(Global.EditSelectIdArray, Agregar(Índice del valor de la matriz(Global.EditSelectIdArray, Global.EditSelected), Verdadero))));
        Fin;
        Esperar(Falso, Ignorar condición);
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
        Esperar hasta(No(Y(Botón presionado(Jugador anfitrión, Botón(Interactuar)), O(Botón presionado(Jugador anfitrión, Botón(Agacharse)), Botón presionado(Jugador anfitrión, Botón(Saltar))))), 0.24);
    }
}

regla ("Editor | cp size hitbox display") {
    evento {
        En curso - Global;
    }
    condiciones {
        "@Event eachPlayer\\n@Condition eventPlayer == hostPlayer"
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_modeSelect == Nulo;
        Botón presionado(Jugador anfitrión, Botón(Interactuar)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Habilidad 1)) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador anfitrión, editor_hitboxToggle, No((Jugador anfitrión).editor_hitboxToggle));
        Esperar(Falso, Ignorar condición);
    }
}

regla ("Editor | cp add/remove teleport") {
    evento {
        En curso - Global;
    }
    condiciones {
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_modeSelect == Nulo;
        (Jugador anfitrión).editor_lock == Falso;
        Conteo de(Global.A) > Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Interactuar)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Recargar)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Melé)) == Falso;
    }
    acciones {
        "prevent overlap with save map"
        Esperar hasta(O(Botón presionado(Jugador anfitrión, Botón(Melé)), No(Y(Botón presionado(Jugador anfitrión, Botón(Interactuar)), Botón presionado(Jugador anfitrión, Botón(Recargar))))), Verdadero);
        Abortar si(O(Botón presionado(Jugador anfitrión, Botón(Melé)), Y(Botón presionado(Jugador anfitrión, Botón(Interactuar)), Botón presionado(Jugador anfitrión, Botón(Recargar)))));
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Si(No((Jugador anfitrión).checkpoint_current));
            Mensaje pequeño(Jugador anfitrión, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   不能在第一个检查点设置传送门"), Cadena personalizada("   Can't place a teleport on first checkpoint")));
            Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
            Abortar;
        Fin;
        "remove"
        Si(Comparar(Conteo de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), >, 1));
            Establecer variable global según el índice(A, (Jugador anfitrión).checkpoint_current, Primero de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)));
            Mensaje pequeño(Jugador anfitrión, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   关卡{0}的传送点已移除", (Jugador anfitrión).checkpoint_current), Cadena personalizada("   Teleport for level {0} has been removed", (Jugador anfitrión).checkpoint_current)));
        "add"
        Si no;
            Establecer variable global según el índice(A, (Jugador anfitrión).checkpoint_current, Matriz(If-Then-Else(Conteo de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), Primero de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)), Posición de(Jugador anfitrión)));
            Mensaje pequeño(Jugador anfitrión, Cadena personalizada("{0} {1}", If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   传送点已添加到当前关卡"), Cadena personalizada("   Teleport has been added for level")), (Jugador anfitrión).checkpoint_current));
        Fin;
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
        Esperar(Falso, Ignorar condición);
    }
}

regla ("Editor | moving checkpoint") {
    evento {
        En curso - Global;
    }
    condiciones {
        "@Event eachPlayer\\n@Condition eventPlayer == hostPlayer"
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_modeSelect == Nulo;
        (Jugador anfitrión).editor_lock == Falso;
        Conteo de(Global.A) > Nulo;
        Botón presionado(Jugador anfitrión, Botón(Habilidad 2)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Disparo secundario)) == Falso;
    }
    acciones {
        Esperar(0.3, Cancelar cuando es falso);
        Si((Jugador anfitrión).addon_toggle3rdPov);
            Establecer variable de jugador(Jugador anfitrión, addon_toggle3rdPov, Falso);
        Fin;
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Establecer variable de jugador(Jugador anfitrión, editor_undo, Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current));
        Comenzar cámara(Jugador anfitrión, Restar(Agregar(Posición de la vista(Jugador anfitrión), Multiplicar(0.5, Arriba)), Multiplicar(2.5, Dirección de orientación de(Jugador anfitrión))), Posición de la vista(Jugador anfitrión), 15);
        Mientras(Y(Y(Botón presionado(Jugador anfitrión, Botón(Habilidad 2)), Está vivo(Jugador anfitrión)), No(Botón presionado(Jugador anfitrión, Botón(Disparo secundario)))));
            Si(Botón presionado(Jugador anfitrión, Botón(Disparo principal)));
                Establecer velocidad de movimiento(Jugador anfitrión, 100);
            Si no;
                Establecer velocidad de movimiento(Jugador anfitrión, 3);
            Fin;
            Si(Conteo de(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current)));
                Establecer variable global según el índice(A, (Jugador anfitrión).checkpoint_current, Matriz(Posición de(Jugador anfitrión), Valor en la matriz(Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), Verdadero)));
            Si no;
                Establecer variable global según el índice(A, (Jugador anfitrión).checkpoint_current, Posición de(Jugador anfitrión));
            Fin;
            Esperar(Falso, Ignorar condición);
        Fin;
        Detener cámara(Jugador anfitrión);
        Establecer velocidad de movimiento(Jugador anfitrión, 100);
        Si(Botón presionado(Jugador anfitrión, Botón(Habilidad 2)));
            Establecer variable global según el índice(A, (Jugador anfitrión).checkpoint_current, (Jugador anfitrión).editor_undo);
            Esperar hasta(No(Botón presionado(Jugador anfitrión, Botón(Habilidad 2))), 999999999999);
        Fin;
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
    }
}

regla ("Editor | add ult/dash") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Jugador del evento == Jugador anfitrión;
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_modeSelect == Nulo;
        (Jugador anfitrión).editor_lock == Falso;
        Conteo de(Global.A) > Nulo;
        Botón presionado(Jugador anfitrión, Botón(Disparo principal)) != Botón presionado(Jugador anfitrión, Botón(Disparo secundario));
        Botón presionado(Jugador anfitrión, Botón(Habilidad máxima)) == Verdadero;
    }
    acciones {
        Si(Botón presionado(Jugador anfitrión, Botón(Disparo principal)));
            Si(La matriz contiene(Global.Dao, (Jugador anfitrión).checkpoint_current));
                Modificar variable global(Dao, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Si no;
                Modificar variable global(Dao, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
            Fin;
        Si no;
            Si(La matriz contiene(Global.SHIFT, (Jugador anfitrión).checkpoint_current));
                Modificar variable global(SHIFT, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
            Si no;
                Modificar variable global(SHIFT, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
            Fin;
        Fin;
        Esperar(Falso, Ignorar condición);
    }
}

regla ("Editor | toggle bans") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "Required for UpdateCache()"
        Jugador del evento == Jugador anfitrión;
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_modeSelect == 3;
        (Jugador anfitrión).editor_lock == Falso;
        Conteo de(Global.A) > Nulo;
        O(O(O(Botón presionado(Jugador anfitrión, Botón(Disparo principal)), Botón presionado(Jugador anfitrión, Botón(Disparo secundario))), Botón presionado(Jugador anfitrión, Botón(Saltar))), Botón presionado(Jugador anfitrión, Botón(Agacharse))) == Verdadero;
        O(Botón presionado(Jugador anfitrión, Botón(Interactuar)), Botón presionado(Jugador anfitrión, Botón(Habilidad 2))) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Si(Botón presionado(Jugador anfitrión, Botón(Interactuar)));
            Si(Botón presionado(Jugador anfitrión, Botón(Disparo principal)));
                Si(La matriz contiene(Global.BanMulti, (Jugador anfitrión).checkpoint_current));
                    Modificar variable global(BanMulti, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
                Si no;
                    Modificar variable global(BanMulti, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
                Fin;
            Si no si(Botón presionado(Jugador anfitrión, Botón(Disparo secundario)));
                Si(La matriz contiene(Global.BanCreate, (Jugador anfitrión).checkpoint_current));
                    Modificar variable global(BanCreate, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
                Si no;
                    Modificar variable global(BanCreate, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
                Fin;
            Si no si(Botón presionado(Jugador anfitrión, Botón(Agacharse)));
                Si(La matriz contiene(Global.BanClimb, (Jugador anfitrión).checkpoint_current));
                    Modificar variable global(BanClimb, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
                Si no;
                    Modificar variable global(BanClimb, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
                Fin;
            Si no;
                Si(La matriz contiene(Global.BanSaveDouble, (Jugador anfitrión).checkpoint_current));
                    Modificar variable global(BanSaveDouble, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
                Si no;
                    Modificar variable global(BanSaveDouble, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
                Fin;
            Fin;
        Si no;
            Si(Botón presionado(Jugador anfitrión, Botón(Disparo principal)));
                Si(La matriz contiene(Global.BanDead, (Jugador anfitrión).checkpoint_current));
                    Modificar variable global(BanDead, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
                Si no;
                    Modificar variable global(BanDead, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
                Fin;
            Si no si(Botón presionado(Jugador anfitrión, Botón(Disparo secundario)));
                Si(La matriz contiene(Global.BanEmote, (Jugador anfitrión).checkpoint_current));
                    Modificar variable global(BanEmote, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
                Si no;
                    Modificar variable global(BanEmote, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
                Fin;
            Si no si(Botón presionado(Jugador anfitrión, Botón(Agacharse)));
                Si(La matriz contiene(Global.BanStand, (Jugador anfitrión).checkpoint_current));
                    Modificar variable global(BanStand, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
                Si no;
                    Modificar variable global(BanStand, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
                Fin;
            Si no;
                Si(La matriz contiene(Global.BanBhop, (Jugador anfitrión).checkpoint_current));
                    Modificar variable global(BanBhop, Eliminar de la matriz por valor, (Jugador anfitrión).checkpoint_current);
                Si no;
                    Modificar variable global(BanBhop, Anexar a la matriz, (Jugador anfitrión).checkpoint_current);
                Fin;
            Fin;
        Fin;
        "BanStand"
        Esperar(0.3, Ignorar condición);
        Llamada a subrutina(UpdateCache);
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
    }
}

regla ("Editor | portal cp change") {
    evento {
        En curso - Global;
    }
    condiciones {
        "@Event eachPlayer\\n@Condition eventPlayer == hostPlayer"
        (Jugador anfitrión).editor_on != Falso;
        (Jugador anfitrión).editor_modeSelect == 4;
        (Jugador anfitrión).editor_lock == Falso;
        Conteo de(Global.EditSelectIdArray) > Nulo;
        Botón presionado(Jugador anfitrión, Botón(Saltar)) == Verdadero;
        Botón presionado(Jugador anfitrión, Botón(Habilidad 2)) == Verdadero;
    }
    acciones {
        Establecer variable global según el índice(CustomPortalCP, Global.EditSelected, If-Then-Else(Comparar(Valor en la matriz(Global.CustomPortalCP, Global.EditSelected), <, Nulo), (Jugador anfitrión).checkpoint_current, -1));
        Esperar(0.3, Ignorar condición);
    }
}

regla ("Editor | move object") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "Required for UpdateCache()"
        Jugador del evento == Jugador anfitrión;
        (Jugador anfitrión).editor_on != Falso;
        La matriz contiene(Matriz(1, 2, 4), (Jugador anfitrión).editor_modeSelect) == Verdadero;
        (Jugador anfitrión).editor_lock == Falso;
        Conteo de(Global.EditSelectIdArray) > Nulo;
        Botón presionado(Jugador anfitrión, Botón(Disparo secundario)) == Falso;
        O(Global.EditorMoveItem, Y(Botón presionado(Jugador anfitrión, Botón(Disparo principal)), Botón presionado(Jugador anfitrión, Botón(Habilidad 2)))) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Verdadero);
        Establecer variable global(EditorMoveItem, Verdadero);
        Si((Jugador anfitrión).addon_toggle3rdPov);
            Establecer variable de jugador(Jugador anfitrión, addon_toggle3rdPov, Falso);
        Fin;
        "hostPlayer.editor_fly = null"
        Esperar hasta(No(O(Botón presionado(Jugador anfitrión, Botón(Disparo principal)), Botón presionado(Jugador anfitrión, Botón(Habilidad 2)))), 999999999999);
        "hostPlayer.disallowButton(Button.ULTIMATE)\\nhostPlayer.disallowButton(Button.JUMP)"
        Establecer estado(Jugador anfitrión, Nulo, Hackeado, 999999999999);
        Establecer velocidad de movimiento(Jugador anfitrión, Falso);
        "hostPlayer.startForcingPosition(hostPlayer.getPosition(), false)"
        Si(Comparar((Jugador anfitrión).editor_modeSelect, ==, 1));
            Establecer variable de jugador(Jugador anfitrión, editor_undo, Valor en la matriz(Global.H, Global.EditSelected));
            Comenzar cámara(Jugador anfitrión, Agregar(Valor en la matriz(Global.H, Global.EditSelected), Multiplicar(Dirección de orientación de(Jugador anfitrión), Multiplicar(Valor absoluto(Valor en la matriz(Global.I, Global.EditSelected)), -1.5))), Valor en la matriz(Global.H, Global.EditSelected), 30);
            Mientras(No(O(Botón presionado(Jugador anfitrión, Botón(Disparo principal)), Botón presionado(Jugador anfitrión, Botón(Disparo secundario)))));
                Modificar variable global según el índice(H, Global.EditSelected, Agregar, Multiplicar(Restar(Agregar(0.096, Multiplicar(0.192, Botón presionado(Jugador del evento, Botón(Saltar)))), Multiplicar(0.048, Botón presionado(Jugador del evento, Botón(Agacharse)))), Agregar(Agregar(Multiplicar(Multiplicar(Dirección de orientación de(Jugador del evento), Componente Z de(Aceleración de(Jugador del evento))), Vector(Verdadero, No(Botón presionado(Jugador del evento, Botón(Habilidad 1))), Verdadero)), Vector global de(Multiplicar(Aceleración de(Jugador del evento), Izquierda), Jugador del evento, Rotación)), Multiplicar(Arriba, Restar(Botón presionado(Jugador del evento, Botón(Habilidad 2)), Botón presionado(Jugador del evento, Botón(Habilidad máxima)))))));
                Esperar(Falso, Ignorar condición);
            Fin;
        Si no si(Comparar((Jugador anfitrión).editor_modeSelect, ==, 2));
            Establecer variable de jugador(Jugador anfitrión, editor_undo, Valor en la matriz(Global.TQ, Global.EditSelected));
            Comenzar cámara(Jugador anfitrión, Agregar(Valor en la matriz(Global.TQ, Global.EditSelected), Multiplicar(Dirección de orientación de(Jugador anfitrión), -4)), Valor en la matriz(Global.TQ, Global.EditSelected), 30);
            Mientras(No(O(Botón presionado(Jugador anfitrión, Botón(Disparo principal)), Botón presionado(Jugador anfitrión, Botón(Disparo secundario)))));
                Modificar variable global según el índice(TQ, Global.EditSelected, Agregar, Multiplicar(Restar(Agregar(0.096, Multiplicar(0.192, Botón presionado(Jugador del evento, Botón(Saltar)))), Multiplicar(0.048, Botón presionado(Jugador del evento, Botón(Agacharse)))), Agregar(Agregar(Multiplicar(Multiplicar(Dirección de orientación de(Jugador del evento), Componente Z de(Aceleración de(Jugador del evento))), Vector(Verdadero, No(Botón presionado(Jugador del evento, Botón(Habilidad 1))), Verdadero)), Vector global de(Multiplicar(Aceleración de(Jugador del evento), Izquierda), Jugador del evento, Rotación)), Multiplicar(Arriba, Restar(Botón presionado(Jugador del evento, Botón(Habilidad 2)), Botón presionado(Jugador del evento, Botón(Habilidad máxima)))))));
                Esperar(Falso, Ignorar condición);
            Fin;
        Si no si(Comparar((Jugador anfitrión).editor_modeSelect, ==, 4));
            Establecer variable de jugador(Jugador anfitrión, editor_undo, Matriz(Valor en la matriz(Global.CustomPortalStart, Global.EditSelected), Valor en la matriz(Global.CustomPortalEndpoint, Global.EditSelected)));
            "move start position"
            Comenzar cámara(Jugador anfitrión, Agregar(Valor en la matriz(Global.CustomPortalStart, Global.EditSelected), Multiplicar(Dirección de orientación de(Jugador anfitrión), -4)), Valor en la matriz(Global.CustomPortalStart, Global.EditSelected), 30);
            Mientras(No(O(Botón presionado(Jugador anfitrión, Botón(Disparo principal)), Botón presionado(Jugador anfitrión, Botón(Disparo secundario)))));
                Modificar variable global según el índice(CustomPortalStart, Global.EditSelected, Agregar, Multiplicar(Restar(Agregar(0.096, Multiplicar(0.192, Botón presionado(Jugador del evento, Botón(Saltar)))), Multiplicar(0.048, Botón presionado(Jugador del evento, Botón(Agacharse)))), Agregar(Agregar(Multiplicar(Multiplicar(Dirección de orientación de(Jugador del evento), Componente Z de(Aceleración de(Jugador del evento))), Vector(Verdadero, No(Botón presionado(Jugador del evento, Botón(Habilidad 1))), Verdadero)), Vector global de(Multiplicar(Aceleración de(Jugador del evento), Izquierda), Jugador del evento, Rotación)), Multiplicar(Arriba, Restar(Botón presionado(Jugador del evento, Botón(Habilidad 2)), Botón presionado(Jugador del evento, Botón(Habilidad máxima)))))));
                Esperar(Falso, Ignorar condición);
            Fin;
            "move destination"
            Comenzar cámara(Jugador anfitrión, Agregar(Valor en la matriz(Global.CustomPortalEndpoint, Global.EditSelected), Multiplicar(Dirección de orientación de(Jugador anfitrión), -4)), Valor en la matriz(Global.CustomPortalEndpoint, Global.EditSelected), 30);
            Esperar hasta(O(No(Botón presionado(Jugador anfitrión, Botón(Disparo principal))), Botón presionado(Jugador anfitrión, Botón(Disparo secundario))), Verdadero);
            Mientras(No(O(Botón presionado(Jugador anfitrión, Botón(Disparo principal)), Botón presionado(Jugador anfitrión, Botón(Disparo secundario)))));
                Modificar variable global según el índice(CustomPortalEndpoint, Global.EditSelected, Agregar, Multiplicar(Restar(Agregar(0.096, Multiplicar(0.192, Botón presionado(Jugador del evento, Botón(Saltar)))), Multiplicar(0.048, Botón presionado(Jugador del evento, Botón(Agacharse)))), Agregar(Agregar(Multiplicar(Multiplicar(Dirección de orientación de(Jugador del evento), Componente Z de(Aceleración de(Jugador del evento))), Vector(Verdadero, No(Botón presionado(Jugador del evento, Botón(Habilidad 1))), Verdadero)), Vector global de(Multiplicar(Aceleración de(Jugador del evento), Izquierda), Jugador del evento, Rotación)), Multiplicar(Arriba, Restar(Botón presionado(Jugador del evento, Botón(Habilidad 2)), Botón presionado(Jugador del evento, Botón(Habilidad máxima)))))));
                Esperar(Falso, Ignorar condición);
            Fin;
        Fin;
        Si(Botón presionado(Jugador anfitrión, Botón(Disparo secundario)));
            Omitir(Multiplicar(2, (Jugador anfitrión).editor_modeSelect));
        Si no;
        Si no;
            Establecer variable global según el índice(H, Global.EditSelected, (Jugador anfitrión).editor_undo);
        Si no;
            Establecer variable global según el índice(TQ, Global.EditSelected, (Jugador anfitrión).editor_undo);
        Si no;
        Si no;
        Si no;
            Establecer variable global según el índice(CustomPortalStart, Global.EditSelected, Primero de((Jugador anfitrión).editor_undo));
            Establecer variable global según el índice(CustomPortalEndpoint, Global.EditSelected, Último de((Jugador anfitrión).editor_undo));
        Fin;
        Establecer variable de jugador(Jugador anfitrión, editor_undo, Nulo);
        "hostPlayer.allowButton(Button.ULTIMATE)\\nhostPlayer.allowButton(Button.JUMP)"
        Eliminar estado(Jugador anfitrión, Hackeado);
        Detener cámara(Jugador anfitrión);
        Establecer velocidad de movimiento(Jugador anfitrión, 100);
        "hostPlayer.stopForcingPosition()"
        Establecer variable global(EditorMoveItem, Nulo);
        Llamada a subrutina(UpdateCache);
        Esperar hasta(No(Botón presionado(Jugador anfitrión, Botón(Disparo principal))), Verdadero);
        Establecer variable de jugador(Jugador anfitrión, editor_lock, Falso);
    }
}

regla ("<tx0C00000000001344> Commands <tx0C00000000001344>") {
    evento {
        En curso - Global;
    }
}

regla ("Command | Toggle Leaderboard (Hold Melee)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Conteo de(Global.LeaderBoardFull) > Nulo;
        (Jugador del evento).editor_on == Falso;
        Botón presionado(Jugador del evento, Botón(Melé)) == Verdadero;
    }
    acciones {
        Esperar(Verdadero, Cancelar cuando es falso);
        Establecer variable de jugador(Jugador del evento, toggle_leaderboard, No((Jugador del evento).toggle_leaderboard));
    }
}

regla ("Command | Split hide (Hold Dash + Primary + Secondary)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Botón presionado(Jugador del evento, Botón(Habilidad 1)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Disparo principal)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Disparo secundario)) == Verdadero;
    }
    acciones {
        Esperar(Verdadero, Cancelar cuando es falso);
        "smallMessage(eventPlayer, \\"   split display off\\" if eventPlayer.timer_splitDisplay != -Math.INFINITY else \\"   split display on\\")"
        Establecer variable de jugador(Jugador del evento, timer_splitDisplay, If-Then-Else(Comparar((Jugador del evento).timer_splitDisplay, <=, -999999999999), Nulo, -999999999999));
        Reproducir efecto(Jugador del evento, Sonido de impacto de potenciamiento, Color(Blanco), Jugador del evento, 100);
        Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar((Jugador del evento).timer_splitDisplay, <=, -999999999999), Cadena personalizada("   split display off"), Cadena personalizada("   split display on")));
        Esperar(0.32, Ignorar condición);
    }
}

regla ("Command | Toggle Invisible (Hold Deflect)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Botón presionado(Jugador del evento, Botón(Habilidad 2)) == Verdadero;
        (Jugador del evento).editor_on == Falso;
        Global.CompMode == Falso;
    }
    acciones {
        Esperar(Verdadero, Cancelar cuando es falso);
        Establecer variable de jugador(Jugador del evento, toggle_invisible, No((Jugador del evento).toggle_invisible));
        Establecer invisibilidad(Jugador del evento, Ninguno);
        Si((Jugador del evento).toggle_invisible);
            Establecer invisibilidad(Jugador del evento, Todos);
        Fin;
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   {0} {1}", If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("隐身模式"), Cadena personalizada("Invisible")), If-Then-Else((Jugador del evento).toggle_invisible, Cadena personalizada("on"), Cadena personalizada("off"))));
        Reproducir efecto(Jugador del evento, Sonido de impacto de despotenciamiento, Nulo, Jugador del evento, 100);
    }
}

regla ("Command | Preview Orbs & Portals (Hold Primary + Secondary)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "@Condition eventPlayer.editor_on == false"
        (Jugador del evento).lockState == Falso;
        (Jugador del evento).lockState == Falso;
        (Jugador del evento).checkpoint_notLast != Falso;
        Botón presionado(Jugador del evento, Botón(Disparo principal)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Disparo secundario)) == Verdadero;
    }
    acciones {
        "wait(0.9, Wait.ABORT_WHEN_FALSE)"
        Esperar(0.45, Cancelar cuando es falso);
        Establecer variable de jugador(Jugador del evento, preview_array1, Matriz(Primero de(Valor en la matriz(Global.A, Agregar((Jugador del evento).checkpoint_current, Verdadero)))));
        Si(Conteo de(Global.pinballnumber));
            Modificar variable de jugador(Jugador del evento, preview_array1, Anexar a la matriz, Matriz filtrada(Global.TQ, Comparar(Valor en la matriz(Global.pinballnumber, Índice de matriz actual), ==, (Jugador del evento).checkpoint_current)));
            Modificar variable de jugador(Jugador del evento, preview_array2, Anexar a la matriz, Matriz filtrada(Matriz mapeada(Global.pinballnumber, Índice de matriz actual), Comparar(Valor en la matriz(Global.pinballnumber, Elemento de matriz actual), ==, (Jugador del evento).checkpoint_current)));
        Fin;
        Si(Conteo de(Global.CustomPortalStart));
            "eventPlayer.preview_array1.append( [i for i in CustomPortalStart if CustomPortalCP[CustomPortalStart.index(i)] == eventPlayer.checkpoint_current] )"
            Para variable de jugador(Jugador del evento, preview_i, 0, Conteo de((Jugador del evento).cache_portalStart), Verdadero);
                Modificar variable de jugador(Jugador del evento, preview_array1, Anexar a la matriz, Matriz(Valor en la matriz((Jugador del evento).cache_portalStart, (Jugador del evento).preview_i), Valor en la matriz((Jugador del evento).cache_portalEnd, (Jugador del evento).preview_i)));
                Modificar variable de jugador(Jugador del evento, preview_array2, Anexar a la matriz, Matriz(Matriz((Jugador del evento).preview_i, Falso), Matriz((Jugador del evento).preview_i, Verdadero)));
            Fin;
        Fin;
        Esperar(Falso, Ignorar condición);
        Establecer variable de jugador(Jugador del evento, preview_i, Nulo);
        Si((Jugador del evento).addon_toggle3rdPov);
            Establecer variable de jugador(Jugador del evento, addon_toggle3rdPov, Falso);
        Fin;
        Comenzar cámara(Jugador del evento, Restar(Agregar(Valor en la matriz((Jugador del evento).preview_array1, (Jugador del evento).preview_i), Arriba), Multiplicar(Restar(3.5, Multiplicar(3, Componente Z de(Aceleración de(Jugador del evento)))), Dirección de orientación de(Jugador del evento))), Agregar(Valor en la matriz((Jugador del evento).preview_array1, (Jugador del evento).preview_i), Arriba), 15);
        Establecer velocidad de movimiento(Jugador del evento, Falso);
        Establecer disparo principal habilitado(Jugador del evento, Falso);
        Establecer disparo secundario habilitado(Jugador del evento, Falso);
        Deshabilitar botón(Jugador del evento, Botón(Habilidad 1));
        Deshabilitar botón(Jugador del evento, Botón(Saltar));
        Mientras(Y(Y(Y(Botón presionado(Jugador del evento, Botón(Disparo principal)), Botón presionado(Jugador del evento, Botón(Disparo secundario))), Está vivo(Jugador del evento)), No((Jugador del evento).lockState)));
            Si(Comparar(Componente X de(Aceleración de(Jugador del evento)), <, -0.5));
                Modificar variable de jugador(Jugador del evento, preview_i, Agregar, Verdadero);
            Si no si(Comparar(Componente X de(Aceleración de(Jugador del evento)), >, 0.5));
                Modificar variable de jugador(Jugador del evento, preview_i, Agregar, Restar(Conteo de((Jugador del evento).preview_array1), Verdadero));
            Fin;
            Modificar variable de jugador(Jugador del evento, preview_i, Módulo, Conteo de((Jugador del evento).preview_array1));
            Esperar hasta(Comparar(Valor absoluto(Componente X de(Aceleración de(Jugador del evento))), <, 0.5), Verdadero);
            Esperar(Falso, Ignorar condición);
        Fin;
        Establecer disparo principal habilitado(Jugador del evento, Verdadero);
        Establecer disparo secundario habilitado(Jugador del evento, Verdadero);
        Habilitar botón(Jugador del evento, Botón(Habilidad 1));
        Habilitar botón(Jugador del evento, Botón(Saltar));
        Detener cámara(Jugador del evento);
        Establecer velocidad de movimiento(Jugador del evento, 100);
        Establecer variable de jugador(Jugador del evento, preview_i, Nulo);
        Establecer variable de jugador(Jugador del evento, preview_array1, Nulo);
        Establecer variable de jugador(Jugador del evento, preview_array2, Nulo);
    }
}

regla ("Command | Restart Run (Crouch + Interact + Deflect)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        O(Comparar((Jugador del evento).editor_lock, ==, Falso), Comparar(Jugador del evento, !=, Jugador anfitrión)) == Verdadero;
        (Jugador del evento).lockState == Falso;
        Botón presionado(Jugador del evento, Botón(Agacharse)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Interactuar)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Habilidad 2)) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, lockState, Verdadero);
        Si(Global.CompMode);
            Esperar(Falso, Ignorar condición);
            Si(Comparar(Global.CompTime, <, 1));
                Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   比赛结束"), Cadena personalizada("   Competition is over")));
                Establecer variable de jugador(Jugador del evento, lockState, Falso);
                Abortar;
            Si no si((Jugador del evento).comp_done);
                Establecer variable de jugador(Jugador del evento, lockState, Falso);
                Abortar;
            Si no si(Y(Global.CompRestartLimit, (Jugador del evento).checkpoint_notLast));
                Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   禁止在此比赛中运行期间重新启动"), Cadena personalizada("   Restart during run is disabled for this competition")));
                Establecer variable de jugador(Jugador del evento, lockState, Falso);
                Abortar;
            Si no si(Global.CompAtmpNum);
                Si(Comparar((Jugador del evento).comp_countAttempts, ==, Global.CompAtmpNum));
                    Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   最后一次尝试"), Cadena personalizada("   This is your final attempt")));
                    Establecer variable de jugador(Jugador del evento, lockState, Falso);
                    Abortar;
                Fin;
                Si(Comparar((Jugador del evento).comp_countAttempts, <, Nulo));
                    Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   你没有尝试过"), Cadena personalizada("   You are out of attempts")));
                    Establecer variable de jugador(Jugador del evento, lockState, Falso);
                    Abortar;
                Fin;
                Modificar variable de jugador(Jugador del evento, comp_countAttempts, Agregar, Verdadero);
                Establecer variable global según el índice(CompAtmpSaveCount, Índice del valor de la matriz(Global.CompAtmpSaveNames, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)), (Jugador del evento).comp_countAttempts);
            Fin;
        Fin;
        Establecer variable de jugador(Jugador del evento, editor_fly, Nulo);
        Establecer variable de jugador(Jugador del evento, checkpoint_current, Nulo);
        Establecer variable de jugador(Jugador del evento, timer_splitDisplay, Multiplicar(-999999999999, Comparar((Jugador del evento).timer_splitDisplay, <=, -999999999999)));
        Establecer variable de jugador(Jugador del evento, toggle_practice, Falso);
        Establecer variable de jugador(Jugador del evento, timer_practice, Nulo);
        Detener seguimiento de variable de jugador(Jugador del evento, timer_practice);
        Si(La matriz contiene(Global.SaveEnt, Jugador del evento));
            Llamada a subrutina(DeleteSave);
        Fin;
        Si(Está muerto(Jugador del evento));
            "eventPlayer.respawn()"
            Resucitar(Jugador del evento);
        Fin;
        Llamada a subrutina(StartGame);
        Reproducir efecto(Jugador del evento, Sonido de explosión en anillo, Color(Blanco), Jugador del evento, 100);
        Esperar(Global.CompMode, Ignorar condición);
        "eventPlayer.allowButton(Button.ABILITY_1)"
        Establecer variable de jugador(Jugador del evento, lockState, Falso);
        Esperar(0.032, Ignorar condición);
    }
}

regla ("Command | Spectate (Hold Interact)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Botón presionado(Jugador del evento, Botón(Interactuar)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Habilidad 2)) == Falso;
        Y((Jugador del evento).editor_on, O(O(Botón presionado(Jugador del evento, Botón(Melé)), Botón presionado(Jugador del evento, Botón(Disparo principal))), Botón presionado(Jugador del evento, Botón(Disparo secundario)))) == Falso;
    }
    acciones {
        "@Condition false == false"
        Esperar(Verdadero, Cancelar cuando es falso);
        "editor has interact combos"
        Si((Jugador del evento).editor_on);
            Esperar(Verdadero, Cancelar cuando es falso);
        Fin;
        Si((Jugador del evento).toggle_spectate);
            "eventPlayer.enableRespawn()"
            Resucitar(Jugador del evento);
            "eventPlayer.respawn()"
            Si((Jugador del evento).toggle_practice);
                Seguir variable de jugador según la tasa(Jugador del evento, timer_practice, 999999999999, Verdadero, Ninguno);
            Si no si((Jugador del evento).checkpoint_notLast);
                Llamada a subrutina(TimerResume);
            Fin;
            Llamada a subrutina(CheckpointFailReset);
        Si no;
            Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   再次长按互动键关闭观战模式"), Cadena personalizada("   Hold Interact again to turn off spectate mode")));
            Establecer variable de jugador(Jugador del evento, toggle_invincible, Falso);
            Llamada a subrutina(TimerPause);
            Detener seguimiento de variable de jugador(Jugador del evento, timer_practice);
            "eventPlayer.disableRespawn()"
            Establecer daño recibido(Jugador del evento, 100);
            Matar(Jugador del evento, Nulo);
            Establecer daño recibido(Jugador del evento, 0);
        Fin;
        Establecer variable de jugador(Jugador del evento, toggle_spectate, No((Jugador del evento).toggle_spectate));
    }
}

regla ("Command | Toggle Invincible Mode (Melee + Reload)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Y(Global.CompMode, (Jugador del evento).comp_done) == Falso;
        (Jugador del evento).lockState == Falso;
        Está vivo(Jugador del evento) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Melé)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Recargar)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Interactuar)) == Falso;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, lockState, Verdadero);
        Establecer variable de jugador(Jugador del evento, toggle_invincible, No((Jugador del evento).toggle_invincible));
        Establecer variable de jugador(Jugador del evento, cache_collectedLocks, Matriz vacía);
        Si((Jugador del evento).toggle_invincible);
            Mensaje grande(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("探点模式"), Cadena personalizada("Invincible mode")));
            Llamada a subrutina(TimerPause);
            Detener seguimiento de variable de jugador(Jugador del evento, timer_practice);
            Comenzar regla(CheckUlt, Reiniciar regla);
            Comenzar regla(CheckDash, Reiniciar regla);
        Si no;
            Si((Jugador del evento).toggle_practice);
                Mensaje grande(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("练习模式"), Cadena personalizada("Practice mode")));
                Seguir variable de jugador según la tasa(Jugador del evento, timer_practice, 999999999999, Verdadero, Ninguno);
                Llamada a subrutina(CheckpointFailReset);
            Si no si((Jugador del evento).checkpoint_notLast);
                Mensaje grande(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("跑图模式"), Cadena personalizada("Normal mode")));
                Llamada a subrutina(TimerResume);
                Llamada a subrutina(CheckpointFailReset);
            Fin;
        Fin;
        Establecer variable de jugador(Jugador del evento, lockState, Falso);
        Esperar(0.032, Ignorar condición);
    }
}

regla ("Command | Toggle Practice Mode (Melee + Ultimate)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        (Jugador del evento).editor_on == Falso;
        Global.CompMode == Falso;
        (Jugador del evento).lockState == Falso;
        Está vivo(Jugador del evento) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Recargar)) == Falso;
        Botón presionado(Jugador del evento, Botón(Melé)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Habilidad máxima)) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, lockState, Verdadero);
        Establecer variable de jugador(Jugador del evento, toggle_practice, No((Jugador del evento).toggle_practice));
        Si((Jugador del evento).toggle_practice);
            Mensaje grande(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("练习模式"), Cadena personalizada("Practice mode")));
            Llamada a subrutina(TimerPause);
            Establecer variable de jugador(Jugador del evento, checkpoint_practice, (Jugador del evento).checkpoint_current);
            Establecer variable de jugador(Jugador del evento, timer_splitDisplay, Multiplicar(-999999999999, Comparar((Jugador del evento).timer_splitDisplay, <=, -999999999999)));
            Establecer variable de jugador(Jugador del evento, timer_split, Nulo);
            Establecer variable de jugador(Jugador del evento, timer_practice, Nulo);
            Seguir variable de jugador según la tasa(Jugador del evento, timer_practice, 999999999999, Verdadero, Ninguno);
            Si((Jugador del evento).toggle_invincible);
                Establecer variable de jugador(Jugador del evento, toggle_invincible, Falso);
                Llamada a subrutina(CheckpointFailReset);
            Fin;
        Si no;
            Mensaje grande(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("跑图模式"), Cadena personalizada("Normal mode")));
            Detener seguimiento de variable de jugador(Jugador del evento, timer_practice);
            Establecer variable de jugador(Jugador del evento, checkpoint_current, (Jugador del evento).checkpoint_practice);
            Llamada a subrutina(UpdateCache);
            Si(Y((Jugador del evento).checkpoint_notLast, No((Jugador del evento).toggle_invincible)));
                Establecer variable de jugador(Jugador del evento, timer_split, (Jugador del evento).timer_normal);
                Llamada a subrutina(TimerResume);
                Llamada a subrutina(CheckpointFailReset);
            Fin;
        Fin;
        Establecer variable de jugador(Jugador del evento, lockState, Falso);
        Esperar(0.032, Ignorar condición);
    }
}

regla ("Command | Restart Practice (Hold Interact)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        (Jugador del evento).editor_on == Falso;
        (Jugador del evento).lockState == Falso;
        (Jugador del evento).toggle_practice != Falso;
        O(Está vivo(Jugador del evento), (Jugador del evento).toggle_spectate) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Interactuar)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Agacharse)) == Falso;
        Botón presionado(Jugador del evento, Botón(Habilidad máxima)) == Falso;
        Botón presionado(Jugador del evento, Botón(Melé)) == Falso;
        Botón presionado(Jugador del evento, Botón(Habilidad 2)) == Falso;
    }
    acciones {
        "first 2 ifs prevent collide with spec"
        Si((Jugador del evento).toggle_spectate);
            Esperar hasta(Está vivo(Jugador del evento), 999999999999);
            Esperar hasta(No(Botón presionado(Jugador del evento, Botón(Interactuar))), 2);
            Abortar;
        Fin;
        Esperar hasta(No(Botón presionado(Jugador del evento, Botón(Interactuar))), 0.9);
        Abortar si(Botón presionado(Jugador del evento, Botón(Interactuar)));
        Establecer variable de jugador(Jugador del evento, timer_practice, Nulo);
        Establecer variable de jugador(Jugador del evento, timer_split, Nulo);
        Establecer variable de jugador(Jugador del evento, checkpoint_current, (Jugador del evento).checkpoint_practice);
        Llamada a subrutina(UpdateCache);
        Llamada a subrutina(CheckpointFailReset);
    }
}

regla ("Command | Skip (Crouch + Primary-Next | Secondary-Previous)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Conteo de(Global.A) > Verdadero;
        Global.EditorMoveItem == Falso;
        Y((Jugador del evento).editor_lock, Comparar(Jugador del evento, ==, Jugador anfitrión)) == Falso;
        O((Jugador anfitrión).editor_on, (Jugador del evento).toggle_practice) == Verdadero;
        (Jugador del evento).lockState == Falso;
        Botón presionado(Jugador del evento, Botón(Agacharse)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Disparo principal)) != Botón presionado(Jugador del evento, Botón(Disparo secundario));
    }
    acciones {
        "@Condition hostPlayer.editor_on or ( eventPlayer.toggle_practice and eventPlayer.isHoldingButton(Button.ABILITY_1) )"
        Establecer variable de jugador(Jugador del evento, lockState, Verdadero);
        Establecer variable de jugador(Jugador del evento, timer_split, Nulo);
        Establecer variable de jugador(Jugador del evento, timer_practice, Nulo);
        Modificar variable de jugador(Jugador del evento, checkpoint_current, Agregar, If-Then-Else(Botón presionado(Jugador del evento, Botón(Disparo secundario)), Restar(Conteo de(Global.A), Verdadero), Verdadero));
        Modificar variable de jugador(Jugador del evento, checkpoint_current, Módulo, Conteo de(Global.A));
        Establecer variable de jugador(Jugador del evento, checkpoint_moved, Verdadero);
        Llamada a subrutina(UpdateCache);
        Llamada a subrutina(CheckpointFailReset);
        Esperar(Falso, Ignorar condición);
        "faster if you spam button"
        Esperar hasta(Comparar(Botón presionado(Jugador del evento, Botón(Disparo principal)), ==, Botón presionado(Jugador del evento, Botón(Disparo secundario))), 0.256);
        Repetir si la condición es verdadera;
        "After loop to prevent instant teleports"
        Establecer variable de jugador(Jugador del evento, lockState, Falso);
    }
}

regla ("Command | Quick Reset (Reload | Hold Reload to Enable)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Botón presionado(Jugador del evento, Botón(Recargar)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Melé)) == Falso;
        Botón presionado(Jugador del evento, Botón(Interactuar)) == Falso;
    }
    acciones {
        Si((Jugador del evento).toggle_quickRestart);
            Si((Jugador del evento).editor_fly);
                Establecer variable de jugador(Jugador del evento, editor_fly, Último de(Valor en la matriz(Global.A, (Jugador del evento).checkpoint_current)));
            Fin;
            Llamada a subrutina(CheckpointFailReset);
            Esperar(0.32, Ignorar condición);
        Fin;
        Esperar(Verdadero, Cancelar cuando es falso);
        Establecer variable de jugador(Jugador del evento, toggle_quickRestart, No((Jugador del evento).toggle_quickRestart));
        Reproducir efecto(Jugador del evento, Sonido de impacto de potenciamiento, Color(Blanco), Jugador del evento, 100);
        Mensaje grande(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else((Jugador del evento).toggle_quickRestart, Cadena personalizada("快速回点已启用"), Cadena personalizada("快速回点已关闭")), If-Then-Else((Jugador del evento).toggle_quickRestart, Cadena personalizada("Quick reset is enabled"), Cadena personalizada("Quick reset is disabled"))));
    }
}

regla ("Command | Toggle Hud (Hold Secondary)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Global.EditorMoveItem == Falso;
        Y(Y((Jugador del evento).editor_on, Comparar(Jugador del evento, ==, Jugador anfitrión)), Botón presionado(Jugador del evento, Botón(Melé))) == Falso;
        Botón presionado(Jugador del evento, Botón(Disparo secundario)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Disparo principal)) == Falso;
        "don't trigger during skipping"
        Botón presionado(Jugador del evento, Botón(Agacharse)) == Falso;
    }
    acciones {
        Esperar(1.5, Cancelar cuando es falso);
        Establecer variable de jugador(Jugador del evento, toggle_guide, No((Jugador del evento).toggle_guide));
        Reproducir efecto(Jugador del evento, Sonido de impacto de potenciamiento, Color(Blanco), Jugador del evento, 100);
        Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else((Jugador del evento).toggle_guide, Cadena personalizada("   HUD已隐藏"), Cadena personalizada("   HUD已开启")), If-Then-Else((Jugador del evento).toggle_guide, Cadena personalizada("   Hud is now hidden"), Cadena personalizada("   Hud is now shown"))));
    }
}

regla ("Command | Toggle Hints (Melee + Deflect)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Global.HintText != Nulo;
        Botón presionado(Jugador del evento, Botón(Melé)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Habilidad 2)) == Verdadero;
        O((Jugador del evento).toggle_hints, La matriz contiene(Global.HintCp, (Jugador del evento).checkpoint_current)) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, toggle_hints, No((Jugador del evento).toggle_hints));
    }
}

regla ("Command | Toggle 3rd Person Camera (Hold Crouch + Jump)") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "True if not null"
        (Jugador del evento).addon_toggle3rdPov <= Verdadero;
        (Jugador del evento).lockState == Falso;
        (Jugador del evento).editor_lock == Falso;
        En el suelo(Jugador del evento) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Agacharse)) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Saltar)) == Verdadero;
    }
    acciones {
        Esperar(Verdadero, Cancelar cuando es falso);
        Establecer variable de jugador(Jugador del evento, addon_toggle3rdPov, No((Jugador del evento).addon_toggle3rdPov));
        Llamada a subrutina(Addon3rdPerson);
    }
}

regla ("<tx0C00000000001344> General <tx0C00000000001344>") {
    evento {
        En curso - Global;
    }
}

regla ("General | SUB Update Effect Cache") {
    evento {
        Subrutina;
        UpdateCache;
    }
    acciones {
        "note: if adding cp pos to cache, make sure to also adjust editor things like move and teleport"
        Establecer variable de jugador(Jugador del evento, cache_bouncePosition, Matriz filtrada(Global.TQ, Comparar(Valor en la matriz(Global.pinballnumber, Índice de matriz actual), ==, (Jugador del evento).checkpoint_current)));
        "eventPlayer.cache_bounceLocks = [_ for _, i in BounceToggleLock if BouncePadCheckpoints[i] == eventPlayer.checkpoint_current and _]\\neventPlayer.cache_bounceMaxLocks = len([_ for _ in eventPlayer.cache_bounceLocks if _])"
        Establecer variable de jugador(Jugador del evento, cache_bounceMaxLocks, Conteo de(Matriz filtrada(Global.BounceToggleLock, Y(Comparar(Valor en la matriz(Global.pinballnumber, Índice de matriz actual), ==, (Jugador del evento).checkpoint_current), Elemento de matriz actual))));
        Establecer variable de jugador(Jugador del evento, cache_killPosition, Matriz filtrada(Global.H, Comparar(Valor en la matriz(Global.killballnumber, Índice de matriz actual), ==, (Jugador del evento).checkpoint_current)));
        Establecer variable de jugador(Jugador del evento, cache_killRadii, Matriz filtrada(Global.I, Comparar(Valor en la matriz(Global.killballnumber, Índice de matriz actual), ==, (Jugador del evento).checkpoint_current)));
        Establecer variable de jugador(Jugador del evento, cache_portalStart, Matriz filtrada(Global.CustomPortalStart, O(Comparar(Valor en la matriz(Global.CustomPortalCP, Índice de matriz actual), ==, (Jugador del evento).checkpoint_current), Comparar(Valor en la matriz(Global.CustomPortalCP, Índice de matriz actual), <, Nulo))));
        Establecer variable de jugador(Jugador del evento, cache_portalEnd, Matriz filtrada(Global.CustomPortalEndpoint, O(Comparar(Valor en la matriz(Global.CustomPortalCP, Índice de matriz actual), ==, (Jugador del evento).checkpoint_current), Comparar(Valor en la matriz(Global.CustomPortalCP, Índice de matriz actual), <, Nulo))));
        Establecer variable de jugador(Jugador del evento, checkpoint_notLast, Y(Comparar((Jugador del evento).checkpoint_current, <, Restar(Conteo de(Global.A), Verdadero)), Comparar(Conteo de(Global.A), >, 1)));
        Establecer variable de jugador(Jugador del evento, toggle_hints, Falso);
        Establecer variable de jugador(Jugador del evento, banString, Matriz vacía);
        Esperar(Falso, Ignorar condición);
        Si((Jugador del evento).checkpoint_notLast);
            Establecer variable de jugador(Jugador del evento, ban_multi, O(Alternado de configuración del Workshop(Cadena personalizada("Ban (applies to all levels)\\n封禁(应用于所有关卡)"), Cadena personalizada("ban Multiclimb - 封禁蹭留"), Falso, 1), La matriz contiene(Global.BanMulti, (Jugador del evento).checkpoint_current)));
            Si((Jugador del evento).ban_multi);
                Establecer variable de jugador(Jugador del evento, banString, Cadena personalizada("∞ {0}", (Jugador del evento).banString));
            Fin;
            Establecer variable de jugador(Jugador del evento, ban_create, O(Alternado de configuración del Workshop(Cadena personalizada("Ban (applies to all levels)\\n封禁(应用于所有关卡)"), Cadena personalizada("ban Createbhop - 封禁卡小"), Falso, 2), La matriz contiene(Global.BanCreate, (Jugador del evento).checkpoint_current)));
            Si((Jugador del evento).ban_create);
                Establecer variable de jugador(Jugador del evento, banString, Cadena personalizada("♂ {0}", (Jugador del evento).banString));
            Fin;
            Establecer variable de jugador(Jugador del evento, ban_standcreate, O(Alternado de configuración del Workshop(Cadena personalizada("Ban (applies to all levels)\\n封禁(应用于所有关卡)"), Cadena personalizada("ban standcreate - 封禁站卡"), Falso, 3), La matriz contiene(Global.BanStand, (Jugador del evento).checkpoint_current)));
            Si((Jugador del evento).ban_standcreate);
                "≥  √ ▼ ↓"
                Establecer variable de jugador(Jugador del evento, banString, Cadena personalizada("♠ {0}", (Jugador del evento).banString));
            Fin;
            Establecer variable de jugador(Jugador del evento, ban_dead, O(Alternado de configuración del Workshop(Cadena personalizada("Ban (applies to all levels)\\n封禁(应用于所有关卡)"), Cadena personalizada("ban Deathbhop - 封禁死小"), Falso, 4), La matriz contiene(Global.BanDead, (Jugador del evento).checkpoint_current)));
            Si((Jugador del evento).ban_dead);
                Establecer variable de jugador(Jugador del evento, banString, Cadena personalizada("X {0}", (Jugador del evento).banString));
            Fin;
            Establecer variable de jugador(Jugador del evento, ban_emote, O(Alternado de configuración del Workshop(Cadena personalizada("Ban (applies to all levels)\\n封禁(应用于所有关卡)"), Cadena personalizada("ban Emote Savehop - 封禁表情留小"), Falso, 5), La matriz contiene(Global.BanEmote, (Jugador del evento).checkpoint_current)));
            Si((Jugador del evento).ban_emote);
                Establecer variable de jugador(Jugador del evento, banString, Cadena personalizada("♥ {0}", (Jugador del evento).banString));
            Fin;
            Establecer variable de jugador(Jugador del evento, ban_climb, O(Alternado de configuración del Workshop(Cadena personalizada("Ban (applies to all levels)\\n封禁(应用于所有关卡)"), Cadena personalizada("ban Wallclimb - 封禁爬墙"), Falso, 6), La matriz contiene(Global.BanClimb, (Jugador del evento).checkpoint_current)));
            Si((Jugador del evento).ban_climb);
                Establecer variable de jugador(Jugador del evento, banString, Cadena personalizada("↑ {0}", (Jugador del evento).banString));
            Fin;
            Establecer variable de jugador(Jugador del evento, ban_savedouble, O(Alternado de configuración del Workshop(Cadena personalizada("Ban (applies to all levels)\\n封禁(应用于所有关卡)"), Cadena personalizada("ban save double - 封禁延二段跳"), Falso, 7), La matriz contiene(Global.BanSaveDouble, (Jugador del evento).checkpoint_current)));
            Si((Jugador del evento).ban_savedouble);
                Establecer variable de jugador(Jugador del evento, banString, Cadena personalizada("△ {0}", (Jugador del evento).banString));
            Fin;
            Establecer variable de jugador(Jugador del evento, ban_bhop, O(Alternado de configuración del Workshop(Cadena personalizada("Ban (applies to all levels)\\n封禁(应用于所有关卡)"), Cadena personalizada("require bhop available - 留小跳进点 "), Falso, 8), La matriz contiene(Global.BanBhop, (Jugador del evento).checkpoint_current)));
            Si((Jugador del evento).ban_bhop);
                "≥  √ ▼ ↓"
                Establecer variable de jugador(Jugador del evento, banString, Cadena personalizada("≥ {0}", (Jugador del evento).banString));
            Fin;
            Establecer variable de jugador(Jugador del evento, ban_djump, O(Alternado de configuración del Workshop(Cadena personalizada("Ban (applies to all levels)\\n封禁(应用于所有关卡)"), Cadena personalizada("require djump available - 留二段跳 "), Falso, 9), La matriz contiene(Global.BanDjump, (Jugador del evento).checkpoint_current)));
            Si((Jugador del evento).ban_djump);
                "≥  √ ▼ ↓ ︽"
                Establecer variable de jugador(Jugador del evento, banString, Cadena personalizada("» {0}", (Jugador del evento).banString));
            Fin;
        Si no;
            Establecer variable de jugador(Jugador del evento, ban_multi, Falso);
            Establecer variable de jugador(Jugador del evento, ban_create, Falso);
            Establecer variable de jugador(Jugador del evento, ban_standcreate, Falso);
            Establecer variable de jugador(Jugador del evento, ban_dead, Falso);
            Establecer variable de jugador(Jugador del evento, ban_emote, Falso);
            Establecer variable de jugador(Jugador del evento, ban_climb, Falso);
            Establecer variable de jugador(Jugador del evento, ban_savedouble, Falso);
            Establecer variable de jugador(Jugador del evento, ban_bhop, Falso);
            Establecer variable de jugador(Jugador del evento, ban_djump, Falso);
        Fin;
        Esperar(Falso, Ignorar condición);
        Comenzar regla(CheckUlt, Reiniciar regla);
        Comenzar regla(CheckDash, Reiniciar regla);
        Abortar si(O(Comparar(Jugador del evento, !=, Jugador anfitrión), No((Jugador del evento).editor_on)));
        Llamada a subrutina(EditUpdateSelectedIds);
        Destruir efecto((Jugador anfitrión).editor_hitboxEffect);
        Crear efecto(If-Then-Else((Jugador anfitrión).editor_hitboxToggle, Jugador anfitrión, Nulo), Esfera, Color(Blanco), Valor en la matriz(Global.A, (Jugador anfitrión).checkpoint_current), 1.4, Visible para posición y radio);
        Establecer variable de jugador(Jugador anfitrión, editor_hitboxEffect, Última entidad creada);
        Crear efecto(If-Then-Else(Y((Jugador anfitrión).editor_hitboxToggle, (Jugador anfitrión).checkpoint_notLast), Jugador anfitrión, Nulo), Esfera, Color(Blanco), Valor en la matriz(Global.A, Agregar((Jugador anfitrión).checkpoint_current, Verdadero)), 1.4, Visible para posición y radio);
        Modificar variable de jugador(Jugador anfitrión, editor_hitboxEffect, Anexar a la matriz, Última entidad creada);
        Establecer variable de jugador(Jugador anfitrión, editor_bounceIndex, Matriz filtrada(Matriz mapeada(Global.pinballnumber, If-Then-Else(Comparar(Elemento de matriz actual, ==, (Jugador anfitrión).checkpoint_current), Índice de matriz actual, -1)), Comparar(Elemento de matriz actual, >=, Nulo)));
        Establecer variable de jugador(Jugador anfitrión, editor_killIndex, Matriz filtrada(Matriz mapeada(Global.killballnumber, If-Then-Else(Comparar(Elemento de matriz actual, ==, (Jugador anfitrión).checkpoint_current), Índice de matriz actual, -1)), Comparar(Elemento de matriz actual, >=, Nulo)));
        Si((Jugador anfitrión).checkpoint_moved);
            Llamada a subrutina(EditorSelectLast);
            Establecer variable de jugador(Jugador anfitrión, checkpoint_moved, Falso);
        Fin;
    }
}

regla ("General | SUB Delete Save") {
    evento {
        Subrutina;
        DeleteSave;
    }
    acciones {
        Modificar variable global(SaveName, Eliminar de la matriz por índice, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento));
        Modificar variable global(SaveCp, Eliminar de la matriz por índice, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento));
        Modificar variable global(SaveTimer, Eliminar de la matriz por índice, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento));
        Modificar variable global(SaveElapsed, Eliminar de la matriz por índice, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento));
        "must always be last because its the index itself"
        Modificar variable global(SaveEnt, Eliminar de la matriz por índice, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento));
    }
}

regla ("General | SUB Make Save") {
    evento {
        Subrutina;
        MakeSave;
    }
    acciones {
        Modificar variable global(SaveEnt, Anexar a la matriz, Jugador del evento);
        Modificar variable global(SaveName, Anexar a la matriz, Separación de cadena(Primero de(Jugador del evento), Matriz vacía));
        Modificar variable global(SaveCp, Anexar a la matriz, (Jugador del evento).checkpoint_current);
        Modificar variable global(SaveTimer, Anexar a la matriz, (Jugador del evento).timer_normal);
        Modificar variable global(SaveElapsed, Anexar a la matriz, Tiempo total transcurrido);
    }
}

regla ("General | SUB Timer Pause") {
    evento {
        Subrutina;
        TimerPause;
    }
    acciones {
        Detener seguimiento de variable de jugador(Jugador del evento, timer_normal);
        Abortar si(No(La matriz contiene(Global.SaveEnt, Jugador del evento)));
        Establecer variable global según el índice(SaveTimer, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento), (Jugador del evento).timer_normal);
        Establecer variable global según el índice(SaveElapsed, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento), Nulo);
    }
}

regla ("General | SUB Timer Resume") {
    evento {
        Subrutina;
        TimerResume;
    }
    acciones {
        Seguir variable de jugador según la tasa(Jugador del evento, timer_normal, 999999999999, Verdadero, Ninguno);
        Establecer variable global según el índice(SaveElapsed, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento), Tiempo total transcurrido);
    }
}

regla ("General | SUB Leaderboard Update") {
    evento {
        Subrutina;
        LeaderboardUpdate;
    }
    acciones {
        "[[name, seconds, prettytime]]\\nyou already have a time"
        Si(La matriz contiene(Matriz mapeada(Global.LeaderBoardFull, Primero de(Elemento de matriz actual)), Separación de cadena(Primero de(Jugador del evento), Matriz vacía)));
            Abortar si(Comparar((Jugador del evento).timer_normal, >=, Valor en la matriz(Primero de(Matriz filtrada(Global.LeaderBoardFull, Comparar(Primero de(Elemento de matriz actual), ==, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)))), Verdadero)));
            Establecer variable global(LeaderBoardFull, Matriz filtrada(Global.LeaderBoardFull, Comparar(Primero de(Elemento de matriz actual), !=, Separación de cadena(Primero de(Jugador del evento), Matriz vacía))));
        Si no si(O(Comparar(Conteo de(Global.LeaderBoardFull), <, 25), Comparar((Jugador del evento).timer_normal, <, Último de(Valor en la matriz(Global.LeaderBoardFull, 19)))));
            Modificar variable global(LeaderBoardFull, Eliminar de la matriz por índice, 24);
        Si no;
            "Full and time too slow"
            Abortar;
        Fin;
        Modificar variable global(LeaderBoardFull, Anexar a la matriz, Matriz(Matriz(Separación de cadena(Primero de(Jugador del evento), Matriz vacía), (Jugador del evento).timer_normal, Cadena personalizada("{0} sec", (Jugador del evento).timer_normal))));
        "CreateLeaderboard()"
        Establecer variable global(LeaderBoardRemake, Verdadero);
    }
}

regla ("General | SUB Checkpoint Fail") {
    evento {
        Subrutina;
        CheckpointFailReset;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, timer_split, If-Then-Else((Jugador del evento).toggle_practice, (Jugador del evento).timer_practice, (Jugador del evento).timer_normal));
        Establecer variable de jugador(Jugador del evento, cache_collectedLocks, Matriz vacía);
        Cancelar acción primaria(Jugador del evento);
        Establecer variable de jugador(Jugador del evento, skill_usedDouble, Nulo);
        Si(No(O((Jugador del evento).checkpoint_current, (Jugador del evento).toggle_practice)));
            Establecer variable de jugador(Jugador del evento, timer_normal, Nulo);
            Establecer variable de jugador(Jugador del evento, timer_split, Nulo);
        Fin;
        Si(Conteo de(Global.A));
            Si(Y(Está utilizando la habilidad 1(Jugador del evento), Global.DashExploitToggle));
                "smallMessage(eventPlayer,\\"   0关卡Shift已禁用!\\" checkCN \\"   Dash Start is banned!\\")"
                Comenzar a forzar la posición del jugador(Jugador del evento, Jugador del evento, Falso);
                Esperar hasta(No(Está utilizando la habilidad 1(Jugador del evento)), Global.DashExploitToggle);
                Dejar de forzar la posición del jugador(Jugador del evento);
            Fin;
            Transportar(Jugador del evento, Último de(Valor en la matriz(Global.A, (Jugador del evento).checkpoint_current)));
            "After teleport incase stopForcingPosition launches the player"
            Aplicar impulso(Jugador del evento, Multiplicar(-1, Rapidez de(Jugador del evento)), 1.192093e-7, Al mundo, Cancelar movimiento contrario XYZ);
            "old: disallow jump > 0.1 sec wait > allow jump, this method bugs with ult check disabling ultimate for some reason\\nif eventPlayer.ban_dead or eventPlayer.ban_emote and eventPlayer.isHoldingButton(Button.JUMP):"
            Si((Jugador del evento).ban_dead);
                Si(Botón presionado(Jugador del evento, Botón(Saltar)));
                    Presionar botón(Jugador del evento, Botón(Saltar));
                Fin;
            Si no;
                "Reset Hop"
                Establecer estado(Jugador del evento, Nulo, Arraigado, 0.096);
            Fin;
            Si(Está usando la habilidad máxima(Jugador del evento));
                Establecer daño recibido(Jugador del evento, 100);
                Matar(Jugador del evento, Nulo);
                Establecer daño recibido(Jugador del evento, 0);
                Esperar(Falso, Ignorar condición);
            Fin;
        Fin;
        Comenzar regla(CheckUlt, Reiniciar regla);
        Comenzar regla(CheckDash, Reiniciar regla);
        Llamada a subrutina(AddonCustomLoadAndReset);
    }
}

regla ("General | SUB Start Game") {
    evento {
        Subrutina;
        StartGame;
    }
    acciones {
        Si(Y(Global.CompMode, O(Comparar(Global.CompTime, <, 1), (Jugador del evento).comp_done)));
            Establecer variable de jugador(Jugador del evento, toggle_leaderboard, Verdadero);
            Establecer variable de jugador(Jugador del evento, comp_done, Verdadero);
            "eventPlayer.disableRespawn()"
            Establecer daño recibido(Jugador del evento, 100);
            Matar(Jugador del evento, Nulo);
            Establecer daño recibido(Jugador del evento, 0);
            Abortar;
        Fin;
        Si(Conteo de(Global.A));
            "load saved progres"
            Si(La matriz contiene(Global.SaveName, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)));
                Establecer variable global según el índice(SaveEnt, Índice del valor de la matriz(Global.SaveName, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)), Jugador del evento);
                Establecer variable de jugador(Jugador del evento, checkpoint_current, Valor en la matriz(Global.SaveCp, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento)));
                Establecer variable de jugador(Jugador del evento, timer_normal, Valor en la matriz(Global.SaveTimer, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento)));
            Si no;
                Establecer variable de jugador(Jugador del evento, checkpoint_current, Nulo);
                Establecer variable de jugador(Jugador del evento, timer_normal, Nulo);
                Llamada a subrutina(MakeSave);
            Fin;
            Llamada a subrutina(UpdateTitle);
            Llamada a subrutina(UpdateCache);
            Llamada a subrutina(CheckpointFailReset);
            "FFA"
            Esperar hasta(Partida en curso, 999999999999);
            Llamada a subrutina(TimerResume);
        Fin;
        "eventPlayer.enableRespawn()"
        Establecer variable de jugador(Jugador del evento, toggle_invincible, Falso);
        Establecer variable de jugador(Jugador del evento, toggle_spectate, Falso);
        Establecer variable de jugador(Jugador del evento, checkpoint_moved, Verdadero);
    }
}

regla ("General | Setup & Variables") {
    evento {
        En curso - Global;
    }
    acciones {
        Desactivar registro de Inspector;
        Deshabilitar la finalización integrada del modo de juego;
        Deshabilitar el sistema de puntuación integrado del modo de juego;
        Deshabilitar la música integrada del modo de juego;
        Deshabilitar el presentador integrado del modo de juego;
        Comenzar a forzar cuarto de reaparición(Todos los equipos, Falso);
        Comenzar a forzar cuarto de reaparición(Todos los equipos, 1);
        Comenzar a forzar cuarto de reaparición(Todos los equipos, 2);
        "wait for map data rule"
        Esperar(0.24, Ignorar condición);
        "fix team because of naming"
        Si(Comparar(Valor en la matriz(Global.ColorConfig, 16), ==, Color(Equipo 1)));
            Establecer variable global según el índice(ColorConfig, 16, Color(Azul));
        Si no si(Comparar(Valor en la matriz(Global.ColorConfig, 16), ==, Color(Equipo 2)));
            Establecer variable global según el índice(ColorConfig, 16, Color(Rojo));
        Fin;
        "prevent same color lock orbs"
        Si(Comparar(Valor en la matriz(Global.ColorConfig, 15), ==, Valor en la matriz(Global.ColorConfig, 16)));
            Establecer variable global según el índice(ColorConfig, 16, If-Then-Else(Comparar(Valor en la matriz(Global.ColorConfig, 15), ==, Color(Naranja)), Color(Verde), Color(Naranja)));
        Fin;
        "prevent same color bhop/climb used/unused"
        Si(Comparar(Valor en la matriz(Global.ColorConfig, 7), ==, Valor en la matriz(Global.ColorConfig, 8)));
            Establecer variable global según el índice(ColorConfig, 8, If-Then-Else(Comparar(Valor en la matriz(Global.ColorConfig, 7), ==, Color(Rojo)), Color(Naranja), Color(Rojo)));
        Fin;
        Establecer variable global(SaveName, Matriz vacía);
        Establecer variable global(SaveCp, Matriz vacía);
        Establecer variable global(SaveTimer, Matriz vacía);
        Establecer variable global(SaveEnt, Matriz vacía);
        "SavePauseTime = []\\nSavePauseEnabled = []"
        Establecer variable global(SaveElapsed, Matriz vacía);
        Establecer variable global(Dao, If-Then-Else(Conteo de(Global.Dao), Matriz filtrada(Global.Dao, Comparar(Agregar(Elemento de matriz actual, Falso), >=, Nulo)), Matriz vacía));
        Establecer variable global(SHIFT, If-Then-Else(Conteo de(Global.SHIFT), Matriz filtrada(Global.SHIFT, Comparar(Agregar(Elemento de matriz actual, Falso), >=, Nulo)), Matriz vacía));
        Establecer variable global(pinballnumber, If-Then-Else(Conteo de(Global.pinballnumber), Global.pinballnumber, Matriz vacía));
        Establecer variable global(A, If-Then-Else(Conteo de(Global.A), Global.A, Matriz vacía));
        Establecer variable global(A, If-Then-Else(Conteo de(Global.A), Global.A, Matriz vacía));
        Establecer variable global(killballnumber, If-Then-Else(Conteo de(Global.killballnumber), Global.killballnumber, Matriz vacía));
        Establecer variable global(H, If-Then-Else(Conteo de(Global.H), Global.H, Matriz vacía));
        Establecer variable global(I, If-Then-Else(Conteo de(Global.I), Global.I, Matriz vacía));
        Establecer variable global(K, If-Then-Else(Conteo de(Global.K), Global.K, Matriz vacía));
        Establecer variable global(TQ, If-Then-Else(Conteo de(Global.TQ), Global.TQ, Matriz vacía));
        Establecer variable global(TQ2, If-Then-Else(Conteo de(Global.TQ2), Global.TQ2, Matriz vacía));
        Establecer variable global(EditMode, If-Then-Else(Conteo de(Global.EditMode), Global.EditMode, Matriz vacía));
        Establecer variable global(TQ5, If-Then-Else(Conteo de(Global.TQ5), Global.TQ5, Matriz vacía));
        Establecer variable global(TQ6, If-Then-Else(Conteo de(Global.TQ6), Global.TQ6, Matriz vacía));
        Establecer variable global(BounceToggleLock, If-Then-Else(Conteo de(Global.BounceToggleLock), Global.BounceToggleLock, Matriz vacía));
        Establecer variable global(CustomPortalStart, If-Then-Else(Conteo de(Global.CustomPortalStart), Global.CustomPortalStart, Matriz vacía));
        Establecer variable global(CustomPortalEndpoint, If-Then-Else(Conteo de(Global.CustomPortalEndpoint), Global.CustomPortalEndpoint, Matriz vacía));
        Establecer variable global(CustomPortalCP, If-Then-Else(Conteo de(Global.CustomPortalCP), Global.CustomPortalCP, Matriz vacía));
        Establecer variable global(LeaderBoardFull, Matriz vacía);
        Establecer variable global(TitleData, Nulo);
        Establecer variable global(HintCp, Matriz vacía);
        Establecer variable global(HintText, Matriz vacía);
        "clean out -1's after the ban has loaded"
        Establecer variable global(BanBhop, If-Then-Else(Conteo de(Global.BanBhop), Matriz filtrada(Global.BanBhop, Comparar(Agregar(Elemento de matriz actual, Falso), >=, Nulo)), Matriz vacía));
        Establecer variable global(BanClimb, If-Then-Else(Conteo de(Global.BanClimb), Matriz filtrada(Global.BanClimb, Comparar(Agregar(Elemento de matriz actual, Falso), >=, Nulo)), Matriz vacía));
        Establecer variable global(BanEmote, If-Then-Else(Conteo de(Global.BanEmote), Matriz filtrada(Global.BanEmote, Comparar(Agregar(Elemento de matriz actual, Falso), >=, Nulo)), Matriz vacía));
        Establecer variable global(BanDead, If-Then-Else(Conteo de(Global.BanDead), Matriz filtrada(Global.BanDead, Comparar(Agregar(Elemento de matriz actual, Falso), >=, Nulo)), Matriz vacía));
        Establecer variable global(BanCreate, If-Then-Else(Conteo de(Global.BanCreate), Matriz filtrada(Global.BanCreate, Comparar(Agregar(Elemento de matriz actual, Falso), >=, Nulo)), Matriz vacía));
        Establecer variable global(BanMulti, If-Then-Else(Conteo de(Global.BanMulti), Matriz filtrada(Global.BanMulti, Comparar(Agregar(Elemento de matriz actual, Falso), >=, Nulo)), Matriz vacía));
        "BanTriple = [i for i in BanTriple if i + false >= 0] if len(BanTriple) else [] # legacy code, now auto sets it to null to save space"
        Establecer variable global(BanStand, If-Then-Else(Conteo de(Global.BanStand), Matriz filtrada(Global.BanStand, Comparar(Agregar(Elemento de matriz actual, Falso), >=, Nulo)), Matriz vacía));
        Establecer variable global(BanSaveDouble, If-Then-Else(Conteo de(Global.BanSaveDouble), Global.BanSaveDouble, Matriz vacía));
        Establecer variable global(BanDjump, If-Then-Else(Conteo de(Global.BanDjump), Global.BanDjump, Matriz vacía));
        "Check if old map forces ban off"
        Si(Conteo de(Global.DashExploitToggle));
            "DashExploitToggle = createWorkshopSetting(bool, \\"Ban (applies to all levels)\\\\n封禁(应用于所有关卡)\\", \\"ban Dash Start - 0关卡Shift\\", true, 2)"
            Establecer variable global(DashExploitToggle, Nulo);
        Fin;
        Si(Alternado de configuración del Workshop(Cadena personalizada("map settings \\n地图设置"), Cadena personalizada("Basic Map Validator - 验证地图"), Verdadero, 3));
            Comenzar regla(AddonCheckMap, Hacer nada);
        Fin;
        Establecer variable global(PortalOn, Alternado de configuración del Workshop(Cadena personalizada("map settings \\n地图设置"), Cadena personalizada("enable portals 󠀨control maps󠀩 - 启用传送门 󠀨占点地图󠀩"), Verdadero, 4));
        Establecer variable global(CompMode, Alternado de configuración del Workshop(Cadena personalizada("Competitive mode\\n竞赛模式"), Cadena personalizada("Turn on competitive mode - 开启竞赛模式"), Falso, 100));
        Si(Global.CompMode);
            "-! comp minutes !-\\n5-240"
            Establecer variable global(CompTime, Número entero de la configuración del Workshop(Cadena personalizada("Competitive mode\\n竞赛模式"), Cadena personalizada("time limit 󠀨global󠀩 - 时间限制"), 120, 1, 240, 101));
            "-! comp attempt count !-"
            Establecer variable global(CompAtmpNum, Número entero de la configuración del Workshop(Cadena personalizada("Competitive mode\\n竞赛模式"), Cadena personalizada("attempt count - 尝试次数"), 5, 0, 500, 102));
            "-! comp restartlimiter !-"
            Establecer variable global(CompRestartLimit, Alternado de configuración del Workshop(Cadena personalizada("Competitive mode\\n竞赛模式"), Cadena personalizada("disable restart during run - 竞赛中禁用重新开始"), Falso, 103));
        Si no;
            Establecer variable global(instructiontext, Nulo);
    }
}

regla ("General | Match time") {
    evento {
        En curso - Global;
    }
    acciones {
        Si(Comparar(Modo de juego actual, !=, Modo de juego(Escaramuza)));
            "0.25"
            Esperar(Falso, Ignorar condición);
            "1"
            Establecer tiempo de la partida(Falso);
            "1.1"
            Esperar(Falso, Ignorar condición);
            "1"
            Establecer tiempo de la partida(Falso);
            "1.1"
            Esperar(Falso, Ignorar condición);
        Fin;
        Establecer tiempo de la partida(70);
        Pausar tiempo de la partida;
        Esperar(Falso, Ignorar condición);
        Establecer variable global(TimeRemaining, 265);
        Mientras(O(Global.TimeRemaining, (Jugador anfitrión).editor_on));
            Esperar(60, Ignorar condición);
            Modificar variable global(TimeRemaining, Restar, Verdadero);
            Si(Global.CompMode);
                Modificar variable global(CompTime, Restar, Verdadero);
                Si(No(Global.CompTime));
                    Mensaje grande(Primero de(Verdadero), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("时间到了"), Cadena personalizada("time's up")));
                    Establecer variable de jugador(Todos los jugadores(Todos los equipos), comp_done, Verdadero);
                    Detener seguimiento de variable de jugador(Todos los jugadores(Todos los equipos), timer_normal);
                    "getAllPlayers().disableRespawn()"
                    Establecer daño recibido(Todos los jugadores(Todos los equipos), 100);
                    Matar(Todos los jugadores(Todos los equipos), Nulo);
                Fin;
            Fin;
        Fin;
        Mensaje grande(Primero de(Verdadero), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("房间已达最大持续时间, 即将重启"), Cadena personalizada("maximum lobby time elapsed, restarting")));
        Esperar(5, Ignorar condición);
        "Prevent crash during POTG and closing lobby"
        Establecer variable de jugador(Todos los jugadores(Todos los equipos), lockState, Verdadero);
        Declarar victoria del jugador(Jugador anfitrión);
        Declarar la victoria del equipo(Equipo de(Jugador anfitrión));
    }
}

regla ("General | Player Initialize") {
    evento {
        El jugador se unió a la partida;
        Todos;
        Todos;
    }
    acciones {
        "Turn Editor On"
        Establecer variable de jugador(Jugador del evento, editor_on, Alternado de configuración del Workshop(Cadena personalizada("map settings \\n地图设置"), Cadena personalizada("Editor mode - 作图模式"), Falso, -1));
        Deshabilitar HUD del modo de juego(Jugador del evento);
        Deshabilitar colisión de movimiento con jugadores(Jugador del evento);
        Establecer daño recibido(Jugador del evento, 0);
        Establecer variable de jugador(Jugador del evento, lockState, Verdadero);
        Abortar si(Robot de entrenamiento(Jugador del evento));
        Habilitar la observación de todos los jugadores como espectador muerto(Jugador del evento);
        Habilitar la observación del HUD objetivo como espectador muerto(Jugador del evento);
        Deshabilitar la reaparición integrada del modo de juego(Jugador del evento);
        Precargar héroe(Jugador del evento, Héroe(Genji));
        Establecer variable de jugador(Jugador del evento, editor_lock, Verdadero);
        Establecer variable de jugador(Jugador del evento, toggle_guide, Verdadero);
        Establecer variable de jugador(Jugador del evento, cache_bounceTouched, -1);
        "big waits first for about 1 second before loading, to make sure things like comp mode are fully loaded and configured, load fx in meanwhile"
        Esperar(Verdadero, Ignorar condición);
        Crear efecto(Jugador del evento, Anillo, Valor en la matriz(Global.ColorConfig, 9), Último de(Valor en la matriz(Global.A, (Jugador del evento).checkpoint_current)), Verdadero, Posición y radio);
        Crear efecto(If-Then-Else((Jugador del evento).checkpoint_notLast, Jugador del evento, Nulo), Anillo, Valor en la matriz(Global.ColorConfig, 10), Valor en la matriz(Global.A, Agregar((Jugador del evento).checkpoint_current, Verdadero)), Verdadero, Visible para posición y radio);
        Crear efecto(If-Then-Else((Jugador del evento).checkpoint_notLast, Jugador del evento, Nulo), Haz de luz, Valor en la matriz(Global.ColorConfig, 11), Valor en la matriz(Global.A, Agregar((Jugador del evento).checkpoint_current, Verdadero)), Verdadero, Visible para posición y radio);
        Crear ícono(If-Then-Else((Jugador del evento).checkpoint_notLast, Jugador del evento, Nulo), Agregar(Valor en la matriz(Global.A, Agregar((Jugador del evento).checkpoint_current, Verdadero)), Arriba), Flecha: Hacia abajo, Visible para y posición, Valor en la matriz(Global.ColorConfig, 12), Verdadero);
        Esperar hasta(Ha aparecido(Jugador del evento), 999999999999);
        Establecer variable de jugador(Jugador del evento, editor_lock, Falso);
        Si(Global.CompMode);
            Establecer invisibilidad(Jugador del evento, Todos);
            Si(La matriz contiene(Global.CompAtmpSaveNames, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)));
                Establecer variable de jugador(Jugador del evento, comp_countAttempts, Valor en la matriz(Global.CompAtmpSaveCount, Índice del valor de la matriz(Global.CompAtmpSaveNames, Separación de cadena(Primero de(Jugador del evento), Matriz vacía))));
            "instructions and settings for comp start"
            Si no;
                Establecer variable de jugador(Jugador del evento, comp_instructionHud, Verdadero);
                Modificar variable global(CompAtmpSaveNames, Anexar a la matriz, Separación de cadena(Primero de(Jugador del evento), Matriz vacía));
                Modificar variable global(CompAtmpSaveCount, Anexar a la matriz, 1);
                Establecer variable de jugador(Jugador del evento, comp_countAttempts, 1);
                Establecer velocidad de movimiento(Jugador del evento, Falso);
                Establecer habilidad 1 habilitada(Jugador del evento, Falso);
                Establecer habilidad máxima habilitada(Jugador del evento, Falso);
                Esperar hasta(No(Botón presionado(Jugador del evento, Botón(Interactuar))), Verdadero);
                Esperar hasta(O(Botón presionado(Jugador del evento, Botón(Interactuar)), Comparar(Global.CompTime, <, 1)), 999999999999);
                Establecer velocidad de movimiento(Jugador del evento, 100);
                Establecer variable de jugador(Jugador del evento, comp_instructionHud, Falso);
            Fin;
            Si(O(Comparar((Jugador del evento).comp_countAttempts, <, Nulo), Comparar(Global.CompTime, <, 1)));
                Establecer variable de jugador(Jugador del evento, comp_done, Verdadero);
            Fin;
        Fin;
        Esperar(Falso, Ignorar condición);
        "initialization of the game"
        Llamada a subrutina(StartGame);
        Establecer variable de jugador(Jugador del evento, lockState, Falso);
    }
}

regla ("General | Player Leaves") {
    evento {
        El jugador abandonó la partida;
        Todos;
        Todos;
    }
    acciones {
        Si(Valor en la matriz(Global.SaveCp, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento)));
            Si(Y(Comparar(Valor en la matriz(Global.SaveCp, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento)), <, Restar(Conteo de(Global.A), Verdadero)), Valor en la matriz(Global.SaveElapsed, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento))));
                Establecer variable global según el índice(SaveTimer, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento), Agregar(Restar(Tiempo total transcurrido, Valor en la matriz(Global.SaveElapsed, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento))), Valor en la matriz(Global.SaveTimer, Índice del valor de la matriz(Global.SaveEnt, Jugador del evento))));
            Fin;
        "delete if player didnt do first cp"
        Si no;
            Llamada a subrutina(DeleteSave);
    }
}

regla ("General | Ground: Traces, Arrive, & Reset") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        (Jugador del evento).lockState == Falso;
        En el suelo(Jugador del evento) == Verdadero;
        Está vivo(Jugador del evento) == Verdadero;
    }
    acciones {
        Si(No((Jugador del evento).checkpoint_notLast));
            Si(Y(En movimiento(Jugador del evento), No(O(O(O((Jugador del evento).toggle_practice, (Jugador del evento).toggle_invisible), (Jugador del evento).editor_on), Global.CompMode))));
                "traces ----------------------------------------------------------------------------------------------------"
                Establecer variable de jugador(Jugador del evento, cache_rainbow, Valor en la matriz(Matriz(Color(Rojo), Color(Naranja), Color(Amarillo), Color(Verde lima), Color(Verde), Color(Turquesa), Color(Azul), Color(Morado), Color(Violeta), Color(Rosa)), Módulo(Redondear a número entero(Multiplicar(Tiempo total transcurrido, 2), Abajo), 10)));
                "eventPlayer.cache_rainbow =  rgb((cosDeg(getTotalTimeElapsed()/2 * 360 - 0) + 0.5) * 255, (cosDeg(getTotalTimeElapsed/2 * 360 - 120) + 0.5) * 255, (cosDeg(getTotalTimeElapsed/2 * 360 - 240) + 0.5) * 255)\\n1.6 - 0.2 in 0.2 steps"
                Reproducir efecto(Primero de(Verdadero), Explosión en anillo, (Jugador del evento).cache_rainbow, Posición de(Jugador del evento), 0.4);
                Esperar(0.048, Ignorar condición);
                Reproducir efecto(Primero de(Verdadero), Explosión en anillo, (Jugador del evento).cache_rainbow, Posición de(Jugador del evento), 0.6);
                Esperar(0.048, Ignorar condición);
                Reproducir efecto(Primero de(Verdadero), Explosión en anillo, (Jugador del evento).cache_rainbow, Posición de(Jugador del evento), 0.8);
                Esperar(0.048, Ignorar condición);
                Reproducir efecto(Primero de(Verdadero), Explosión en anillo, (Jugador del evento).cache_rainbow, Posición de(Jugador del evento), 1);
                Esperar(0.048, Ignorar condición);
                Reproducir efecto(Primero de(Verdadero), Explosión en anillo, (Jugador del evento).cache_rainbow, Posición de(Jugador del evento), 1.2);
                Esperar(0.048, Ignorar condición);
                Reproducir efecto(Primero de(Verdadero), Explosión en anillo, (Jugador del evento).cache_rainbow, Posición de(Jugador del evento), 1.4);
                Esperar(0.048, Ignorar condición);
            Fin;
        "or eventPlayer.lockState:"
        Si no si(O((Jugador del evento).toggle_invincible, Y(Global.CompMode, No(Global.CompTime))));
        Si no si(Comparar(Distancia entre(Jugador del evento, Valor en la matriz(Global.A, Agregar((Jugador del evento).checkpoint_current, Verdadero))), <=, 1.4));
            "arrived ----------------------------------------------------------------------------------------------------\\nkill player if not colleted the locks"
            Si(Comparar(Conteo de((Jugador del evento).cache_collectedLocks), <, (Jugador del evento).cache_bounceMaxLocks));
                Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   ! 进点前需集齐所有收集球 !"), Cadena personalizada("   ! collect ALL {0} orbs to unlock !", Valor en la matriz(Global.ColorConfig, 16))));
                "kill(eventPlayer, null)"
                Llamada a subrutina(CheckpointFailReset);
            Si no si(Y((Jugador del evento).ban_climb, (Jugador del evento).skill_usedClimb));
                Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   爬墙 ↑ 已禁用!"), Cadena personalizada("   Climb ↑ is banned!")));
                Llamada a subrutina(CheckpointFailReset);
            Si no si(Y((Jugador del evento).ban_bhop, (Jugador del evento).skill_usedBhop));
                Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   ≥ 留小跳进点!"), Cadena personalizada("   ≥ Must have a bhop to complete!")));
                Llamada a subrutina(CheckpointFailReset);
            Si no si(Y((Jugador del evento).ban_djump, (Jugador del evento).skill_usedDouble));
                Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   » 留二段跳!"), Cadena personalizada("   » Must have a double jump to complete!")));
                Llamada a subrutina(CheckpointFailReset);
            Si no;
                Establecer variable de jugador(Jugador del evento, checkpoint_moved, Verdadero);
                Modificar variable de jugador(Jugador del evento, checkpoint_current, Agregar, Verdadero);
                Llamada a subrutina(UpdateCache);
                "remove ult feature disabled for speedruning purposes\\nif eventPlayer.isUsingUltimate() and not eventPlayer.checkpoint_current in BladeEnabledCheckpoints:\\nCheckpointFailReset()\\nteleport cps"
                Si(Comparar(Conteo de(Valor en la matriz(Global.A, (Jugador del evento).checkpoint_current)), >, 1));
                    Llamada a subrutina(CheckpointFailReset);
                Fin;
                Si(Comparar((Jugador del evento).timer_splitDisplay, >, -999999999999));
                    Establecer variable de jugador(Jugador del evento, timer_splitDisplay, Restar(If-Then-Else((Jugador del evento).toggle_practice, (Jugador del evento).timer_practice, (Jugador del evento).timer_normal), (Jugador del evento).timer_split));
                Fin;
                Esperar(Falso, Ignorar condición);
                Reproducir efecto(Jugador del evento, Sonido de explosión en anillo, Color(Blanco), Jugador del evento, 100);
                Reproducir efecto(If-Then-Else(O(Global.CompMode, (Jugador del evento).toggle_invisible), Jugador del evento, Verdadero), Explosión en anillo, Color(Azul cielo), Agregar(Valor en la matriz(Global.A, (Jugador del evento).checkpoint_current), Multiplicar(1.5, Arriba)), 4);
                "msg disabled due to annoying new sound\\nbigMessage(eventPlayer,  \\"{1} {0}\\".format(eventPlayer.checkpoint_current, \\"抵达检查点\\" checkCN \\"Arrived at level\\")   )"
                Esperar(Falso, Ignorar condición);
                Llamada a subrutina(AddonCustomLoadAndReset);
                Si((Jugador del evento).toggle_practice);
                    Establecer variable de jugador(Jugador del evento, timer_split, (Jugador del evento).timer_practice);
                Si no;
                    Llamada a subrutina(UpdateTitle);
                    Establecer variable de jugador(Jugador del evento, timer_split, (Jugador del evento).timer_normal);
                    Llamada a subrutina(DeleteSave);
                    "complete lvl"
                    Si(Y(Comparar((Jugador del evento).checkpoint_current, ==, Restar(Conteo de(Global.A), Verdadero)), No((Jugador del evento).editor_on)));
                        Detener seguimiento de variable de jugador(Jugador del evento, timer_normal);
                        Esperar(Falso, Ignorar condición);
                        Mensaje grande(Primero de(Verdadero), Cadena personalizada("{0} {1} {2} sec", Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("已通关! 用时"), Cadena personalizada("Mission complete! Time")), (Jugador del evento).timer_normal));
                        Llamada a subrutina(LeaderboardUpdate);
                        Si(Y(Global.CompMode, Global.CompAtmpNum));
                            Si(Comparar((Jugador del evento).comp_countAttempts, ==, Global.CompAtmpNum));
                                Establecer variable global según el índice(CompAtmpSaveCount, Índice del valor de la matriz(Global.CompAtmpSaveNames, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)), -1);
                                Establecer variable de jugador(Jugador del evento, comp_countAttempts, -1);
                                Establecer variable de jugador(Jugador del evento, comp_done, Verdadero);
                                Establecer variable de jugador(Jugador del evento, toggle_leaderboard, Verdadero);
                                "eventPlayer.disableRespawn()"
                                Establecer daño recibido(Jugador del evento, 100);
                                Matar(Jugador del evento, Nulo);
                                Establecer daño recibido(Jugador del evento, 0);
                            Si no;
                                Establecer variable global según el índice(CompAtmpSaveCount, Índice del valor de la matriz(Global.CompAtmpSaveNames, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)), Agregar((Jugador del evento).comp_countAttempts, Verdadero));
                            Fin;
                        Fin;
                    "update save"
                    Si no;
                        Llamada a subrutina(MakeSave);
                    Fin;
                Fin;
            Fin;
        Si no si(Comparar(Distancia entre(Jugador del evento, Último de(Valor en la matriz(Global.A, (Jugador del evento).checkpoint_current))), >, 1.4));
            Llamada a subrutina(CheckpointFailReset);
        Fin;
        Establecer variable de jugador(Jugador del evento, cache_collectedLocks, Matriz vacía);
        Esperar(0.048, Ignorar condición);
        Repetir si la condición es verdadera;
    }
}

regla ("General | Boundary Sphere") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        (Jugador del evento).cache_killPosition != Matriz vacía;
        (Jugador del evento).toggle_invincible == Falso;
        (Jugador del evento).checkpoint_notLast != Falso;
        Es verdadero para cualquiera((Jugador del evento).cache_killRadii, Comparar(Multiplicar(Normalizar(Elemento de matriz actual), Distancia entre(Valor en la matriz((Jugador del evento).cache_killPosition, Índice de matriz actual), Jugador del evento)), <, Elemento de matriz actual)) == Verdadero;
    }
    acciones {
        Llamada a subrutina(CheckpointFailReset);
    }
}

regla ("General | Bounce Ball / Orb") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        (Jugador del evento).cache_bouncePosition != Matriz vacía;
        "@Condition eventPlayer.checkpoint_notLast # disabled coz editor"
        Es verdadero para cualquiera((Jugador del evento).cache_bouncePosition, Comparar(Distancia entre(Elemento de matriz actual, Agregar(Posición de(Jugador del evento), Multiplicar(0.7, Arriba))), <, 1.4)) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, cache_bounceTouched, Índice del valor de la matriz(Global.TQ, Matriz filtrada(Global.TQ, Y(Y(Y(Comparar(Valor en la matriz(Global.pinballnumber, Índice de matriz actual), ==, (Jugador del evento).checkpoint_current), Comparar(Índice de matriz actual, !=, (Jugador del evento).cache_bounceTouched)), No(La matriz contiene((Jugador del evento).cache_collectedLocks, Índice de matriz actual))), Comparar(Distancia entre(Agregar(Jugador del evento, Multiplicar(0.7, Arriba)), Elemento de matriz actual), <, 1.4)))));
        "prevent same one trigering twice in a row"
        Si(Comparar((Jugador del evento).cache_bounceTouched, >=, Nulo));
            Si(Valor en la matriz(Global.BounceToggleLock, (Jugador del evento).cache_bounceTouched));
                Modificar variable de jugador(Jugador del evento, cache_collectedLocks, Anexar a la matriz, (Jugador del evento).cache_bounceTouched);
                Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   弹球已收集"), Cadena personalizada("   orb has been collected")));
            Fin;
            Si(Comparar(Valor en la matriz(Global.EditMode, (Jugador del evento).cache_bounceTouched), >, Nulo));
                Aplicar impulso(Jugador del evento, Arriba, Valor en la matriz(Global.EditMode, (Jugador del evento).cache_bounceTouched), Al mundo, Cancelar movimiento contrario XYZ);
            Si no si(Comparar(Valor en la matriz(Global.EditMode, (Jugador del evento).cache_bounceTouched), <, Nulo));
                Cancelar acción primaria(Jugador del evento);
                Establecer variable de jugador(Jugador del evento, skill_usedDouble, Nulo);
                Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   二段跳已就绪"), Cadena personalizada("   Double Jump is ready")));
            Fin;
            Si(Valor en la matriz(Global.TQ5, (Jugador del evento).cache_bounceTouched));
                Establecer habilidad máxima habilitada(Jugador del evento, Verdadero);
                Establecer carga de habilidad máxima(Jugador del evento, 100);
                Mensaje pequeño(Jugador del evento, Cadena personalizada("   {0} {1} ", Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad máxima)), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("终极技能已就绪"), Cadena personalizada("Ultimate is ready"))));
            Fin;
            Si(Valor en la matriz(Global.TQ6, (Jugador del evento).cache_bounceTouched));
                Si(Está utilizando la habilidad 1(Jugador del evento));
                    Esperar hasta(No(Está utilizando la habilidad 1(Jugador del evento)), Verdadero);
                    Esperar(Falso, Ignorar condición);
                Fin;
                Establecer habilidad 1 habilitada(Jugador del evento, Verdadero);
                Mensaje pequeño(Jugador del evento, Cadena personalizada("   {0} {1} ", Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad 1)), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("技能1影已就绪"), Cadena personalizada("Dash is ready"))));
            Fin;
            Reproducir efecto(Jugador del evento, Sonido de explosión de potenciamiento, Color(Blanco), Jugador del evento, 75);
        Fin;
        Esperar(0.24, Ignorar condición);
        Repetir si la condición es verdadera;
        Establecer variable de jugador(Jugador del evento, cache_bounceTouched, -1);
    }
}

regla ("General | Death Reset") {
    evento {
        El jugador murió;
        Todos;
        Todos;
    }
    condiciones {
        Robot de entrenamiento(Jugador del evento) == Falso;
        (Jugador del evento).toggle_spectate == Falso;
        (Jugador del evento).comp_done == Falso;
    }
    acciones {
        Si(Conteo de(Global.A));
            Resucitar(Jugador del evento);
        Si no;
            Reaparecer(Jugador del evento);
        Fin;
        Llamada a subrutina(CheckpointFailReset);
        "rest is to prevent dead spamming from crashing server\\nbut doing waits only when needed without relying on a variable count"
        Esperar hasta(Está vivo(Jugador del evento), Verdadero);
        Esperar hasta(Está muerto(Jugador del evento), Verdadero);
        Si(Y(Está muerto(Jugador del evento), No(O((Jugador del evento).toggle_spectate, (Jugador del evento).comp_done))));
            Esperar(0.16, Ignorar condición);
            Resucitar(Jugador del evento);
            Llamada a subrutina(CheckpointFailReset);
            Esperar hasta(Está vivo(Jugador del evento), Verdadero);
            Esperar hasta(Está muerto(Jugador del evento), Verdadero);
            Si(Y(Está muerto(Jugador del evento), No(O((Jugador del evento).toggle_spectate, (Jugador del evento).comp_done))));
                Esperar(0.44, Ignorar condición);
                Resucitar(Jugador del evento);
                Llamada a subrutina(CheckpointFailReset);
                Esperar hasta(Está vivo(Jugador del evento), Verdadero);
                Esperar hasta(Está muerto(Jugador del evento), Verdadero);
                Si(Y(Está muerto(Jugador del evento), No(O((Jugador del evento).toggle_spectate, (Jugador del evento).comp_done))));
                    Esperar(0.64, Ignorar condición);
                    Reaparecer(Jugador del evento);
                    Llamada a subrutina(CheckpointFailReset);
    }
}

regla ("<tx0C00000000001344> Huds <tx0C00000000001344>") {
    evento {
        En curso - Global;
    }
}

regla ("Huds | Global Localplayer") {
    evento {
        En curso - Global;
    }
    acciones {
        Esperar(0.8, Ignorar condición);
        "name/credit construction\\nnote on changing default name/credit\\nif you change it, also change it in the credits rule\\nthe old credits should always remain valid here to keep old data valid"
        Si(Comparar(Global.Name, ==, Cadena personalizada("name here - 作者")));
            "Legacy Credits"
            Establecer variable global(Name, Primero de(Global.Cachedcredits));
        Fin;
        Si(No(Global.Name));
            Establecer variable global(Name, Cadena personalizada("name here - 作者"));
        Fin;
        Si(Comparar(Global.Code, ==, Cadena personalizada("code here - 代码")));
            "Legacy Credits"
            Establecer variable global(Code, Último de(Global.Cachedcredits));
        Fin;
        Si(No(Global.Code));
            Establecer variable global(Code, Cadena personalizada("code here - 代码"));
        Fin;
        Establecer variable global(Cachedcredits, Nulo);
        "hudSubtext(localPlayer.toggle_guide, \\"Discord: dsc.gg/genjiparkour\\" LeftAlign96, HudPosition.LEFT, HO.data_dsc, ColorConfig[Customize.dsc], HudReeval.VISIBILITY, SpecVisibility.DEFAULT)"
        Crear texto del HUD(Primero de(Verdadero), Nulo, If-Then-Else((Jugador local).toggle_guide, Cadena personalizada("Discord: dsc.gg/genjiparkour"), Matriz vacía), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("作者: {0}                                                                                                ", Global.Name), Cadena personalizada("Made by: {0}                                                                                                ", Global.Name)), Izquierda, -200, Nulo, Valor en la matriz(Global.ColorConfig, 18), Primero de(Global.ColorConfig), Visible para y cadena, Visibilidad predeterminada);
        Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
        Crear texto del HUD(Primero de(Verdadero), Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("代码: {0}                                                                                                ", Global.Code), Cadena personalizada("Map code: {0}                                                                                                ", Global.Code)), Izquierda, -199, Nulo, Nulo, Valor en la matriz(Global.ColorConfig, Verdadero), Visible para y cadena, Visibilidad predeterminada);
        Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
        "global huds"
        Crear texto del HUD(Primero de(Verdadero), Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("房间将在 {0} 分钟后重启 - v1.10.3F{1}", Global.TimeRemaining, If-Then-Else(Comparar(Conteo de texto, >=, 128), Cadena personalizada("\\n错误: 已达到最大HUD数量上限"), Matriz vacía)), Cadena personalizada("Server Restart in {0} Min - v1.10.3F{1}", Global.TimeRemaining, If-Then-Else(Comparar(Conteo de texto, >=, 128), Cadena personalizada("\\nerror: max hud count reached"), Matriz vacía))), Nulo, Derecha, -162, Nulo, Valor en la matriz(Global.ColorConfig, 2), Nulo, Visible para y cadena, Siempre visible);
        "padding for custom hud display"
        Crear texto del HUD(Primero de(Verdadero), Nulo, Nulo, Cadena personalizada("\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nv"), Arriba, -164, Nulo, Nulo, Color(Naranja), Visible para, Visibilidad predeterminada);
        Crear texto del HUD((Jugador local).toggle_guide, Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0} {1} | {2}快速回点", If-Then-Else((Jugador local).toggle_quickRestart, Matriz vacía, Cadena personalizada("长按")), Cadena de teclas de atajo(Botón(Recargar)), If-Then-Else((Jugador local).toggle_quickRestart, Matriz vacía, Cadena personalizada("启用"))), Cadena personalizada("{0} {1} |{2} quick reset", If-Then-Else((Jugador local).toggle_quickRestart, Matriz vacía, Cadena personalizada("Hold")), Cadena de teclas de atajo(Botón(Recargar)), If-Then-Else((Jugador local).toggle_quickRestart, Matriz vacía, Cadena personalizada(" Enable")))), Derecha, -157, Nulo, Nulo, Valor en la matriz(Global.ColorConfig, 5), Visible para y cadena, Visibilidad predeterminada);
        Crear texto del HUD((Jugador local).toggle_guide, Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0} + {1} | 探点模式{2}", Cadena de teclas de atajo(Botón(Recargar)), Cadena de teclas de atajo(Botón(Melé)), If-Then-Else((Jugador local).toggle_invincible, Cadena personalizada(" | 启用"), Matriz vacía)), Cadena personalizada("{0} + {1} | Invincible{2}", Cadena de teclas de atajo(Botón(Recargar)), Cadena de teclas de atajo(Botón(Melé)), If-Then-Else((Jugador local).toggle_invincible, Cadena personalizada(" | ON"), Matriz vacía))), Derecha, -154, Nulo, Nulo, If-Then-Else((Jugador local).toggle_invincible, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 6)), Evaluar una vez(Valor en la matriz(Global.ColorConfig, 5))), Visible para cadena y color, Visibilidad predeterminada);
        Crear texto del HUD(Primero de(Verdadero), Nulo, If-Then-Else((Jugador local).toggle_guide, Matriz vacía, Cadena personalizada("{0}{1}{2}", If-Then-Else((Jugador local).toggle_invincible, Cadena de ícono de habilidad(Héroe(Baptiste), Botón(Habilidad 2)), Matriz vacía), If-Then-Else((Jugador local).toggle_practice, Cadena de ícono de habilidad(Héroe(D.VA), Botón(Habilidad máxima)), Matriz vacía), If-Then-Else((Jugador local).toggle_invisible, Cadena de ícono de habilidad(Héroe(Sombra), Botón(Habilidad 1)), Matriz vacía))), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("长按 {0} | 切换显示HUD", Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("Hold {0} | toggle hud", Cadena de teclas de atajo(Botón(Disparo secundario)))), Derecha, -161, Nulo, Valor en la matriz(Global.ColorConfig, 5), Valor en la matriz(Global.ColorConfig, 5), Visible para y cadena, Visibilidad predeterminada);
        Crear texto del HUD((Jugador local).toggle_guide, Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("长按 {0} + {1} | 预览关卡", Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario))), Cadena personalizada("Hold {0} + {1} | Preview cp", Cadena de teclas de atajo(Botón(Disparo principal)), Cadena de teclas de atajo(Botón(Disparo secundario)))), Derecha, -160, Nulo, Nulo, If-Then-Else((Jugador local).preview_array1, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 6)), Evaluar una vez(Valor en la matriz(Global.ColorConfig, 5))), Visible para cadena y color, Visibilidad predeterminada);
        "HudStoreEdit.append(getLastCreatedText())"
        Crear texto del HUD(Primero de(Y((Jugador local).preview_array1, (Jugador local).toggle_guide)), Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("移动键 ◀ ▶ | 预览其他\\n移动键 ◀ ▶ | 修改间距 \\n视角移动 | 调整浏览视角"), Cadena personalizada("Walk ◀ ▶ | preview others\\nWalk ▲ ▼ | modify zoom\\nAim | change preview angle")), Nulo, Arriba, -171, Nulo, Valor en la matriz(Global.ColorConfig, 6), Nulo, Visible para y cadena, Nunca visible);
        "HudStoreEdit.append(getLastCreatedText())"
        Crear texto del HUD(Jugador local, Nulo, Nulo, If-Then-Else(O(Comparar((Jugador local).timer_splitDisplay, <=, -999999999999), (Jugador local).toggle_spectate), Matriz vacía, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("单关用时 {0}                                                                                                ", (Jugador local).timer_splitDisplay), Cadena personalizada("Split: {0}                                                                                                ", (Jugador local).timer_splitDisplay))), Izquierda, -195, Nulo, Nulo, Valor en la matriz(Global.ColorConfig, 3), Visible para y cadena, Visibilidad predeterminada);
        Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
        "text per checkpoint  text per cp each"
        Si(Conteo de(Global.CpHudText));
            Crear texto del HUD(Primero de(Y(La matriz contiene(Global.CpHudCp, (Jugador local).checkpoint_current), (Jugador local).toggle_guide)), Valor en la matriz(Global.CpHudText, Índice del valor de la matriz(Global.CpHudCp, (Jugador local).checkpoint_current)), Nulo, Nulo, Arriba, -169, Color(Azul), Nulo, Nulo, Visible para y cadena, Visibilidad predeterminada);
        Fin;
        Si(Conteo de(Global.CpIwtText));
            Crear texto dentro del mundo(La matriz contiene(Global.CpIwtCp, (Jugador local).checkpoint_current), Valor en la matriz(Global.CpIwtText, Índice del valor de la matriz(Global.CpIwtCp, (Jugador local).checkpoint_current)), Valor en la matriz(Global.CpIwtPos, Índice del valor de la matriz(Global.CpIwtCp, (Jugador local).checkpoint_current)), 2, Atravesar las superficies, Visible para posición y cadena, Global.CpIwtColor, Visibilidad predeterminada);
        Fin;
        "Remove no hints - visual and element bloat"
        Si(Conteo de(Global.HintText));
            Crear texto del HUD(Primero de(Y((Jugador local).toggle_guide, La matriz contiene(Global.HintCp, (Jugador local).checkpoint_current))), Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else((Jugador local).toggle_hints, Cadena personalizada("― ― ― ― ― 提示 ― ― ― ― ―\\n {0} ", Valor en la matriz(Global.HintText, Índice del valor de la matriz(Global.HintCp, (Jugador local).checkpoint_current))), Cadena personalizada("――――――  有可用提示 ――――――")), If-Then-Else((Jugador local).toggle_hints, Cadena personalizada("― ― ― ― ― Hint ― ― ― ― ―\\n {0} ", Valor en la matriz(Global.HintText, Índice del valor de la matriz(Global.HintCp, (Jugador local).checkpoint_current))), Cadena personalizada("― ― ― hint available ― ― ―"))), Cadena personalizada("{0} + {1} | {2}", Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena de teclas de atajo(Botón(Melé)), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else((Jugador local).toggle_hints, Cadena personalizada("隐藏提示"), Cadena personalizada("获取提示")), If-Then-Else((Jugador local).toggle_hints, Cadena personalizada("hide hint"), Cadena personalizada("show hint")))), Derecha, -151, Nulo, If-Then-Else((Jugador local).toggle_hints, Color(Verde), Color(Naranja)), If-Then-Else(La matriz contiene(Global.HintCp, (Jugador local).checkpoint_current), Evaluar una vez(Valor en la matriz(Global.ColorConfig, 5)), Color(Gris)), Visible para cadena y color, Visibilidad predeterminada);
            Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
        Fin;
        Si(Global.CompMode);
            Crear texto del HUD(Matriz filtrada(Todos los jugadores(Todos los equipos), (Elemento de matriz actual).comp_instructionHud), Cadena personalizada("                                                                                                                           "), Nulo, Nulo, Arriba, -181, Color(Blanco), Nulo, Nulo, Visible para, Visibilidad predeterminada);
            Si(Primero de(Global.instructiontext));
                Crear texto del HUD(Matriz filtrada(Todos los jugadores(Todos los equipos), (Elemento de matriz actual).comp_instructionHud), Nulo, Nulo, Primero de(Global.instructiontext), Arriba, -180, Nulo, Nulo, Color(Blanco), Visible para, Visibilidad predeterminada);
            Fin;
            Si(Valor en la matriz(Global.instructiontext, Verdadero));
                Crear texto del HUD(Matriz filtrada(Todos los jugadores(Todos los equipos), (Elemento de matriz actual).comp_instructionHud), Nulo, Nulo, Valor en la matriz(Global.instructiontext, Verdadero), Arriba, -179, Nulo, Nulo, Color(Blanco), Visible para, Visibilidad predeterminada);
            Fin;
            Si(Valor en la matriz(Global.instructiontext, 2));
                Crear texto del HUD(Matriz filtrada(Todos los jugadores(Todos los equipos), (Elemento de matriz actual).comp_instructionHud), Nulo, Nulo, Valor en la matriz(Global.instructiontext, 2), Arriba, -178, Nulo, Nulo, Color(Blanco), Visible para, Visibilidad predeterminada);
            Fin;
            Si(Valor en la matriz(Global.instructiontext, 3));
                Crear texto del HUD(Matriz filtrada(Todos los jugadores(Todos los equipos), (Elemento de matriz actual).comp_instructionHud), Nulo, Nulo, Valor en la matriz(Global.instructiontext, 3), Arriba, -177, Nulo, Nulo, Color(Blanco), Visible para, Visibilidad predeterminada);
            Fin;
            Crear texto del HUD(Matriz filtrada(Todos los jugadores(Todos los equipos), (Elemento de matriz actual).comp_instructionHud), Cadena personalizada("                                   Press {0} to start                                ", Cadena de teclas de atajo(Botón(Interactuar))), Nulo, Nulo, Arriba, -176, Color(Blanco), Nulo, Nulo, Visible para y cadena, Visibilidad predeterminada);
        Si no;
            Crear texto del HUD((Jugador local).toggle_guide, Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("长按 {0} | 观战模式{1}", Cadena de teclas de atajo(Botón(Interactuar)), If-Then-Else((Jugador local).toggle_spectate, Cadena personalizada(" | 启用"), Matriz vacía)), Cadena personalizada("Hold {0} | Spectate{1}", Cadena de teclas de atajo(Botón(Interactuar)), If-Then-Else((Jugador local).toggle_spectate, Cadena personalizada(" | ON"), Matriz vacía))), Derecha, -155, Nulo, Nulo, If-Then-Else((Jugador local).toggle_spectate, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 6)), Evaluar una vez(Valor en la matriz(Global.ColorConfig, 5))), Visible para cadena y color, Visibilidad predeterminada);
            Crear texto del HUD((Jugador local).toggle_guide, Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("长按 {0} | 隐身模式{1}", Cadena de teclas de atajo(Botón(Habilidad 2)), If-Then-Else((Jugador local).toggle_invisible, Cadena personalizada(" | 启用"), Matriz vacía)), Cadena personalizada("Hold {0} | invisible{1}", Cadena de teclas de atajo(Botón(Habilidad 2)), If-Then-Else((Jugador local).toggle_invisible, Cadena personalizada(" | ON"), Matriz vacía))), Derecha, -158, Nulo, Nulo, If-Then-Else((Jugador local).toggle_invisible, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 6)), Evaluar una vez(Valor en la matriz(Global.ColorConfig, 5))), Visible para cadena y color, Visibilidad predeterminada);
            Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
            Crear texto del HUD((Jugador local).toggle_guide, Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0} + {1} | 练习模式{2}", Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Melé)), If-Then-Else((Jugador local).toggle_practice, Cadena personalizada(" | ({0})", (Jugador local).checkpoint_practice), Matriz vacía)), Cadena personalizada("{0} + {1} | Practice{2}", Cadena de teclas de atajo(Botón(Habilidad máxima)), Cadena de teclas de atajo(Botón(Melé)), If-Then-Else((Jugador local).toggle_practice, Cadena personalizada(" | ({0})", (Jugador local).checkpoint_practice), Matriz vacía))), Derecha, -153, Nulo, Nulo, If-Then-Else((Jugador local).toggle_practice, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 6)), Evaluar una vez(Valor en la matriz(Global.ColorConfig, 5))), Visible para cadena y color, Visibilidad predeterminada);
            Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
            Crear texto del HUD(Matriz filtrada(Todos los jugadores(Todos los equipos), Y((Elemento de matriz actual).toggle_practice, (Elemento de matriz actual).toggle_guide)), Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0} + {1} | 下一关\\n{0} + {2}", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena personalizada("{0} | 上一关\\n{1} | 回到练习模式起点 ", Cadena de teclas de atajo(Botón(Disparo secundario)), Cadena de teclas de atajo(Botón(Interactuar)))), Cadena personalizada("{0} + {1} | Next level\\n{0} + {2}", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Disparo principal)), Cadena personalizada("{0} | Previous level\\n{1} | Start from practice cp ", Cadena de teclas de atajo(Botón(Disparo secundario)), Cadena de teclas de atajo(Botón(Interactuar))))), Nulo, Derecha, -152, Nulo, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 6)), Nulo, Visible para cadena y color, Visibilidad predeterminada);
            Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
        Fin;
        "if not hostPlayer.editor_on:\\nfind the value"
        Establecer variable global(Difficultyhud, Matriz(Combinado de la configuración del Workshop(Cadena personalizada("map settings \\n地图设置"), Cadena personalizada("difficulty 󠀨display hud󠀩 - 难度 󠀨顶部hud󠀩"), 0, Matriz(Cadena personalizada("<fg27AAFFFF>playtest - 游戏测试"), Cadena personalizada("<fgA0E81BFF>easy-"), Cadena personalizada("<fgA0E81BFF>easy"), Cadena personalizada("<fgA0E81BFF>easy+"), Cadena personalizada("<fge0e000FF>medium-"), Cadena personalizada("<fge0e000FF>medium"), Cadena personalizada("<fge0e000FF>medium+"), Cadena personalizada("<fgEC9900FF>hard-"), Cadena personalizada("<fgEC9900FF>hard"), Cadena personalizada("<fgEC9900FF>hard+"), Cadena personalizada("<fgFF4500FF>very hard-"), Cadena personalizada("<fgFF4500FF>very hard"), Cadena personalizada("<fgFF4500FF>very hard+"), Cadena personalizada("<fgC80013FF>extreme-"), Cadena personalizada("<fgC80013FF>extreme"), Cadena personalizada("<fgC80013FF>extreme+"), Cadena personalizada("<fg960000FF>hell"), Cadena personalizada("don't display - 不显示")), 0), Alternado de configuración del Workshop(Cadena personalizada("map settings \\n地图设置"), Cadena personalizada("Playtest display - 游戏测试"), Falso, 1)));
        "display\\n17th entry is 'dont display'"
        Si(Comparar(Primero de(Global.Difficultyhud), !=, 17));
            Crear texto del HUD(If-Then-Else(Y((Jugador local).toggle_guide, No((Jugador local).toggle_leaderboard)), Jugador local, Nulo), If-Then-Else(Último de(Global.Difficultyhud), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("游戏测试"), Cadena personalizada("Playtest")), Matriz vacía), Valor en la matriz(Matriz(Cadena personalizada("playtest"), Cadena personalizada("easy -"), Cadena personalizada("easy"), Cadena personalizada("easy +"), Cadena personalizada("medium -"), Cadena personalizada("medium"), Cadena personalizada("medium +"), Cadena personalizada("hard -"), Cadena personalizada("hard"), Cadena personalizada("hard +"), Cadena personalizada("very hard -"), Cadena personalizada("very hard"), Cadena personalizada("very hard +"), Cadena personalizada("extreme -"), Cadena personalizada("extreme"), Cadena personalizada("extreme +"), Cadena personalizada("hell"), Nulo), Primero de(Global.Difficultyhud)), Nulo, Arriba, -173, Color(Azul), Valor en la matriz(Matriz(Color(Azul), Color(Verde lima), Color(Verde lima), Color(Verde lima), Color(Amarillo), Color(Amarillo), Color(Amarillo), Color(Naranja), Color(Naranja), Color(Naranja), Color personalizado(255, 69, 0, 255), Color personalizado(255, 69, 0, 255), Color personalizado(255, 69, 0, 255), Color(Rojo), Color(Rojo), Color(Rojo), Color personalizado(150, 0, 0, 255), Nulo), Primero de(Global.Difficultyhud)), Nulo, Visible para y cadena, Visibilidad predeterminada);
            Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
        Fin;
        "restart + leaderboard\\nthis is remade in editor to not include leaderboard"
        Crear texto del HUD((Jugador local).toggle_guide, Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0} + {1} + {2}", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena personalizada("{0} | 重新开始\\n长按 {1} | 完整成绩排名", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Melé)))), Cadena personalizada("{0} + {1} + {2}", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Habilidad 2)), Cadena personalizada("{0} | Restart\\nHold {1} | leaderboard", Cadena de teclas de atajo(Botón(Interactuar)), Cadena de teclas de atajo(Botón(Melé))))), Derecha, -156, Nulo, Nulo, Valor en la matriz(Global.ColorConfig, 5), Visible para y cadena, Visibilidad predeterminada);
        Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
    }
}

regla ("Huds | Leaderboard") {
    evento {
        En curso - Global;
    }
    condiciones {
        Global.LeaderBoardRemake != Falso;
        Global.LeaderBoardFull != Matriz vacía;
    }
    acciones {
        "account for delay in completion"
        Esperar(Falso, Ignorar condición);
        Mientras(Conteo de(Global.LeaderBoardHuds));
            Destruir texto del HUD(Primero de(Global.LeaderBoardHuds));
            Modificar variable global(LeaderBoardHuds, Eliminar de la matriz por índice, Falso);
        Fin;
        "top 5"
        Establecer variable global(LeaderBoardFull, Matriz ordenada(Global.LeaderBoardFull, Valor en la matriz(Elemento de matriz actual, Verdadero)));
        Establecer variable global(LeaderBoardRemake, Matriz vacía);
        Establecer variable global(LeaderBoardHuds, Matriz mapeada(Global.LeaderBoardFull, Cadena personalizada("　 {0}:　{1} - {2}", Agregar(Índice de matriz actual, Verdadero), Primero de(Elemento de matriz actual), Último de(Elemento de matriz actual))));
        Mientras(Conteo de(Global.LeaderBoardHuds));
            Establecer variable global(LeaderBoardRemake, Cadena personalizada("{0}\\n{1}", Global.LeaderBoardRemake, Primero de(Global.LeaderBoardHuds)));
            Modificar variable global(LeaderBoardHuds, Eliminar de la matriz por índice, Falso);
        Fin;
        Establecer variable global(LeaderBoardRemake, Cadena personalizada("{0}\\n", Global.LeaderBoardRemake));
        "if LeaderBoardFull[0]:"
        Crear texto del HUD((Jugador local).toggle_guide, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada(" \\n{0} 排名前5 {0}", Cadena de ícono(Bandera)), Cadena personalizada(" \\n{0} Top 5 {0}", Cadena de ícono(Bandera))), Nulo, Derecha, -141, Nulo, Color(Blanco), Nulo, Visible para y cadena, Siempre visible);
        Establecer variable global(LeaderBoardHuds, ID de texto anterior);
        Crear texto del HUD((Jugador local).toggle_guide, Cadena de ícono de héroe(Héroe(Genji)), Primero de(Primero de(Global.LeaderBoardFull)), Último de(Primero de(Global.LeaderBoardFull)), Derecha, -140, Color(Rojo), Color(Rojo), Color(Rojo), Visible para, Siempre visible);
        Modificar variable global(LeaderBoardHuds, Anexar a la matriz, ID de texto anterior);
        Si(Valor en la matriz(Global.LeaderBoardFull, Verdadero));
            Crear texto del HUD((Jugador local).toggle_guide, Cadena de ícono de héroe(Héroe(Genji)), Primero de(Valor en la matriz(Global.LeaderBoardFull, Verdadero)), Último de(Valor en la matriz(Global.LeaderBoardFull, Verdadero)), Derecha, -139, Color(Naranja), Color(Naranja), Color(Naranja), Visible para, Siempre visible);
            Modificar variable global(LeaderBoardHuds, Anexar a la matriz, ID de texto anterior);
            Si(Valor en la matriz(Global.LeaderBoardFull, 2));
                Crear texto del HUD((Jugador local).toggle_guide, Cadena de ícono de héroe(Héroe(Genji)), Primero de(Valor en la matriz(Global.LeaderBoardFull, 2)), Último de(Valor en la matriz(Global.LeaderBoardFull, 2)), Derecha, -138, Color(Amarillo), Color(Amarillo), Color(Amarillo), Visible para, Siempre visible);
                Modificar variable global(LeaderBoardHuds, Anexar a la matriz, ID de texto anterior);
                Si(Valor en la matriz(Global.LeaderBoardFull, 3));
                    Crear texto del HUD((Jugador local).toggle_guide, Cadena de ícono de héroe(Héroe(Genji)), Primero de(Valor en la matriz(Global.LeaderBoardFull, 3)), Último de(Valor en la matriz(Global.LeaderBoardFull, 3)), Derecha, -137, Color(Verde lima), Color(Verde lima), Color(Verde lima), Visible para, Siempre visible);
                    Modificar variable global(LeaderBoardHuds, Anexar a la matriz, ID de texto anterior);
                    Si(Valor en la matriz(Global.LeaderBoardFull, 4));
                        Crear texto del HUD((Jugador local).toggle_guide, Cadena de ícono de héroe(Héroe(Genji)), Primero de(Valor en la matriz(Global.LeaderBoardFull, 4)), Último de(Valor en la matriz(Global.LeaderBoardFull, 4)), Derecha, -136, Color(Verde), Color(Verde), Color(Verde), Visible para, Siempre visible);
                        Modificar variable global(LeaderBoardHuds, Anexar a la matriz, ID de texto anterior);
                    Fin;
                Fin;
            Fin;
        Fin;
        Crear texto del HUD(If-Then-Else(Evaluar una vez(Y(Global.CompMode, No(Global.CompTime))), Verdadero, (Jugador local).toggle_leaderboard), Cadena personalizada("　　　　 {0} {1} {0} 　　　　\\n　　　　　　　　　　　　　　　　　　{2}", Cadena de ícono(Bandera), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("成绩排名"), Cadena personalizada("Leaderboard")), Evaluar una vez(Global.LeaderBoardRemake)), Nulo, Nulo, Arriba, -165, Color(Blanco), Nulo, Nulo, Visible para y cadena, Visibilidad predeterminada);
        Modificar variable global(LeaderBoardHuds, Anexar a la matriz, ID de texto anterior);
        Establecer variable global(LeaderBoardRemake, Nulo);
        Esperar(Falso, Ignorar condición);
    }
}

regla ("Huds | Each Player") {
    evento {
        El jugador se unió a la partida;
        Todos;
        Todos;
    }
    acciones {
        Esperar(0.512, Ignorar condición);
        Crear texto del HUD(Jugador del evento, Nulo, If-Then-Else((Jugador del evento).toggle_practice, Cadena personalizada("{0} {1} sec", If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("练习用时"), Cadena personalizada("Practice Time:")), (Jugador del evento).timer_practice), Matriz vacía), Cadena personalizada("{0} {1} sec                                                                                                ", If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("用时"), Cadena personalizada("Time:")), (Jugador del evento).timer_normal), Izquierda, -196, Nulo, Color(Gris), Valor en la matriz(Global.ColorConfig, 3), Cadena, Visibilidad predeterminada);
        Crear texto del HUD(If-Then-Else((Jugador del evento).toggle_leaderboard, Nulo, Jugador del evento), If-Then-Else((Jugador del evento).preview_array1, Cadena personalizada(" {0} ({1}/{2}", If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else((Jugador del evento).preview_i, If-Then-Else(Comparar((Jugador del evento).preview_i, <=, Conteo de((Jugador del evento).cache_bouncePosition)), Cadena personalizada("弹球"), Cadena personalizada("自定义传送门")), Cadena personalizada("检查点")), If-Then-Else((Jugador del evento).preview_i, If-Then-Else(Comparar((Jugador del evento).preview_i, <=, Conteo de((Jugador del evento).cache_bouncePosition)), Cadena personalizada("orb"), Cadena personalizada("portal")), Cadena personalizada("checkpoint"))), Agregar((Jugador del evento).preview_i, Verdadero), Cadena personalizada("{0})\\n―――――――――――\\n {1}\\n", Conteo de((Jugador del evento).preview_array1), If-Then-Else(Y(Comparar((Jugador del evento).preview_i, <=, Conteo de((Jugador del evento).cache_bouncePosition)), (Jugador del evento).preview_i), Cadena personalizada("{0} {1} {2}", If-Then-Else(Valor en la matriz(Global.TQ5, Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)), Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad máxima)), Matriz vacía), If-Then-Else(Valor en la matriz(Global.TQ6, Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)), Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad 1)), Matriz vacía), Cadena personalizada("{0} {1}", If-Then-Else(Valor en la matriz(Global.BounceToggleLock, Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)), Cadena de ícono(Advertencia), Matriz vacía), If-Then-Else(Comparar(Valor en la matriz(Global.EditMode, Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)), >, Nulo), Cadena de ícono(Flecha: Hacia arriba), If-Then-Else(Comparar(Valor en la matriz(Global.EditMode, Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)), <, Nulo), Cadena de ícono(Flecha: Hacia abajo), Matriz vacía)))), If-Then-Else((Jugador del evento).preview_i, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else(Último de(Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)), Cadena personalizada("传送门 {0} 出口 ", Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)), Cadena personalizada("传送门 {0} 入口 ", Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i))), If-Then-Else(Último de(Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)), Cadena personalizada("portal {0} destination ", Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)), Cadena personalizada("portal {0} start ", Valor en la matriz((Jugador del evento).preview_array2, (Jugador del evento).preview_i)))), (Jugador del evento).banString)))), Matriz vacía), If-Then-Else((Jugador del evento).preview_array1, Matriz vacía, Cadena personalizada("{0}{1} {2}", If-Then-Else(Y((Jugador del evento).toggle_guide, Longitud de la cadena((Jugador del evento).banString)), Cadena personalizada("{0}\\n", (Jugador del evento).banString), Matriz vacía), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("关卡"), Cadena personalizada("Level")), Cadena personalizada("{0} / {1}", (Jugador del evento).checkpoint_current, Restar(Conteo de(Global.A), Verdadero)))), If-Then-Else(Y((Jugador del evento).cache_bounceMaxLocks, No((Jugador del evento).preview_array1)), Cadena personalizada("{0}{1} {2}", Valor en la matriz(Global.ColorConfig, 16), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("球"), Cadena personalizada(" orbs")), Cadena personalizada("{0} / {1}", Conteo de((Jugador del evento).cache_collectedLocks), (Jugador del evento).cache_bounceMaxLocks)), Matriz vacía), Arriba, -172, Valor en la matriz(Global.ColorConfig, 4), Valor en la matriz(Global.ColorConfig, 4), Valor en la matriz(Global.ColorConfig, 16), Visible para y cadena, Visibilidad predeterminada);
        Crear texto del HUD(Jugador del evento, Nulo, Nulo, Cadena personalizada("{0}{1}{2}", If-Then-Else(Componente X de((Jugador del evento).cache_inputs), Cadena personalizada("■"), Cadena personalizada("□")), If-Then-Else(Comparar(Componente Z de(Aceleración de(Jugador del evento)), >, Nulo), Cadena personalizada("▲"), Cadena personalizada("△")), Cadena personalizada("{0}\\n{1}{2}", If-Then-Else(Componente Y de((Jugador del evento).cache_inputs), Cadena personalizada("●"), Cadena personalizada("○")), If-Then-Else(Comparar(Componente X de(Aceleración de(Jugador del evento)), >, Nulo), Cadena personalizada("◀"), Cadena personalizada("◁")), Cadena personalizada("{0}{1}                                                                                                ", If-Then-Else(Comparar(Componente Z de(Aceleración de(Jugador del evento)), <, Nulo), Cadena personalizada("▼"), Cadena personalizada("∇")), If-Then-Else(Comparar(Componente X de(Aceleración de(Jugador del evento)), <, Nulo), Cadena personalizada("▶"), Cadena personalizada("▷"))))), Izquierda, -192, Nulo, Nulo, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 3)), Cadena, Visibilidad predeterminada);
        "climb/bhop indicators"
        Crear texto del HUD(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0}{1}", If-Then-Else((Jugador del evento).skill_usedClimb, Cadena personalizada("爬墙已用"), Cadena personalizada("爬墙未用")), If-Then-Else((Jugador del evento).skill_countMulti, Cadena personalizada(" ({0})", (Jugador del evento).skill_countMulti), Matriz vacía)), Cadena personalizada("Climb{0}", If-Then-Else((Jugador del evento).skill_countMulti, Cadena personalizada(" ({0})", (Jugador del evento).skill_countMulti), Matriz vacía))), Nulo, Cadena personalizada("                                                                                                                                "), Izquierda, -193, If-Then-Else((Jugador del evento).skill_usedClimb, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 8)), Evaluar una vez(Valor en la matriz(Global.ColorConfig, 7))), Nulo, Nulo, Cadena y color, Visibilidad predeterminada);
        Crear texto del HUD(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("{0}{1}", If-Then-Else((Jugador del evento).skill_usedBhop, Cadena personalizada("小跳已用"), Cadena personalizada("小跳未用")), If-Then-Else((Jugador del evento).skill_countCreates, Cadena personalizada(" ({0})", (Jugador del evento).skill_countCreates), Matriz vacía)), Cadena personalizada("Bhop{0}", If-Then-Else((Jugador del evento).skill_countCreates, Cadena personalizada(" ({0})", (Jugador del evento).skill_countCreates), Matriz vacía))), Nulo, Cadena personalizada("                                                                                                                                "), Izquierda, -194, If-Then-Else((Jugador del evento).skill_usedBhop, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 8)), Evaluar una vez(Valor en la matriz(Global.ColorConfig, 7))), Nulo, Nulo, Cadena y color, Visibilidad predeterminada);
        Crear texto dentro del mundo(If-Then-Else(Y((Jugador del evento).checkpoint_notLast, (Jugador del evento).toggle_guide), Jugador del evento, Nulo), If-Then-Else(Y((Jugador del evento).cache_bounceMaxLocks, Comparar(Conteo de((Jugador del evento).cache_collectedLocks), <, (Jugador del evento).cache_bounceMaxLocks)), Cadena personalizada("{0} {1}", Cadena de ícono(Advertencia), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("先收集橙球"), Cadena personalizada("collect orbs first"))), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("到这里来"), Cadena personalizada("come here"))), Valor en la matriz(Global.A, Agregar((Jugador del evento).checkpoint_current, Verdadero)), 1.5, No atravesar, Visible para posición y cadena, Valor en la matriz(Global.ColorConfig, 13), Visibilidad predeterminada);
        Esperar(2.5, Ignorar condición);
        Si(Global.CompMode);
            Crear texto del HUD(Jugador del evento, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else(Global.CompTime, Cadena personalizada("剩余时间: {0} 分钟{1}", Global.CompTime, If-Then-Else(Comparar((Jugador del evento).comp_countAttempts, <, Nulo), Cadena personalizada("\\n你没有尝试过"), If-Then-Else(Global.CompAtmpNum, Cadena personalizada("\\n尝试 {0} / {1}", (Jugador del evento).comp_countAttempts, Global.CompAtmpNum), Matriz vacía))), Cadena personalizada("! 比赛结束 !")), If-Then-Else(Global.CompTime, Cadena personalizada("time left: {0} min{1}", Global.CompTime, If-Then-Else(Comparar((Jugador del evento).comp_countAttempts, <, Nulo), Cadena personalizada("\\nYou are out of attempts"), If-Then-Else(Global.CompAtmpNum, Cadena personalizada("\\nAttempt {0} / {1}", (Jugador del evento).comp_countAttempts, Global.CompAtmpNum), Matriz vacía))), Cadena personalizada("! competition is over !"))), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), If-Then-Else(Global.CompTime, Cadena personalizada("竞赛模式"), Cadena personalizada("竞赛模式\\n\\n\\n")), If-Then-Else(Global.CompTime, Cadena personalizada("competitive mode"), Cadena personalizada("competitive mode\\n\\n\\n"))), Arriba, -182, Nulo, Color(Amarillo), Color(Amarillo), Cadena, Visibilidad predeterminada);
    }
}

regla ("Huds | SUB Update Title") {
    evento {
        Subrutina;
        UpdateTitle;
    }
    acciones {
        "or eventPlayer.toggle_practice:"
        Abortar si(O(O(Global.CompMode, (Jugador del evento).editor_on), No(Y(Conteo de(Global.TitleData), La matriz contiene(Primero de(Global.TitleData), (Jugador del evento).checkpoint_current)))));
        Destruir texto dentro del mundo((Jugador del evento).cache_titleHud);
        Crear texto dentro del mundo(Primero de(No((Jugador del evento).toggle_invisible)), Valor en la matriz(Valor en la matriz(Global.TitleData, Verdadero), Índice del valor de la matriz(Primero de(Global.TitleData), (Jugador del evento).checkpoint_current)), Jugador del evento, 1.1, Atravesar las superficies, Visible para y posición, Valor en la matriz(Último de(Global.TitleData), Índice del valor de la matriz(Primero de(Global.TitleData), (Jugador del evento).checkpoint_current)), Visibilidad predeterminada);
        Establecer variable de jugador(Jugador del evento, cache_titleHud, ID de texto anterior);
    }
}

regla ("Huds | Addons") {
    evento {
        En curso - Global;
    }
    acciones {
        Esperar hasta(Comparar(Cantidad de jugadores(Todos los equipos), >, Nulo), 999999999999);
        Esperar(Falso, Ignorar condición);
        Si(Comparar((Todos los jugadores(Todos los equipos)).addon_toggle3rdPov, <=, Verdadero));
            Crear texto del HUD((Jugador local).toggle_guide, Nulo, Nulo, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("长按 {0} + {1} | 第三人称{2}", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Saltar)), If-Then-Else((Jugador local).addon_toggle3rdPov, Cadena personalizada(" | 启用"), Matriz vacía)), Cadena personalizada("Hold {0} + {1} | 3rd Person{2}", Cadena de teclas de atajo(Botón(Agacharse)), Cadena de teclas de atajo(Botón(Saltar)), If-Then-Else((Jugador local).addon_toggle3rdPov, Cadena personalizada(" | ON"), Matriz vacía))), Derecha, -159, Nulo, Nulo, If-Then-Else((Jugador local).addon_toggle3rdPov, Evaluar una vez(Valor en la matriz(Global.ColorConfig, 6)), Evaluar una vez(Valor en la matriz(Global.ColorConfig, 5))), Visible para cadena y color, Visibilidad predeterminada);
    }
}

regla ("<tx0C00000000001344> Effects <tx0C00000000001344>") {
    evento {
        En curso - Global;
    }
}

regla ("Effects | Setup Effects") {
    evento {
        En curso - Global;
    }
    acciones {
        "add back to below wait if removed"
        Esperar(1.264, Ignorar condición);
        "pre set control map portals. not in portal rule because shared I variable"
        Si(Conteo de(Global.PortalDest));
            Para variable global(NANBA, 0, Conteo de(Global.PortalLoc), Verdadero);
                Crear efecto(Matriz filtrada(Todos los jugadores(Todos los equipos), O((Elemento de matriz actual).toggle_invincible, No((Elemento de matriz actual).checkpoint_notLast))), Mala Aura, If-Then-Else(Módulo(Global.NANBA, 2), Color(Aguamarina), Color(Naranja)), Valor en la matriz(Global.PortalLoc, Global.NANBA), 0.6, Visible para);
                Crear texto dentro del mundo(Matriz filtrada(Todos los jugadores(Todos los equipos), O((Elemento de matriz actual).toggle_invincible, No((Elemento de matriz actual).checkpoint_notLast))), Valor en la matriz(Global.PortalNames, Global.NANBA), Agregar(Valor en la matriz(Global.PortalLoc, Global.NANBA), Arriba), Verdadero, Atravesar las superficies, Visible para, Color(Blanco), Visibilidad predeterminada);
            Fin;
        Fin;
        Esperar(Falso, Ignorar condición);
        Esperar hasta(La entidad existe(Todos los jugadores(Todos los equipos)), 999999999999);
        Si((Todos los jugadores(Todos los equipos)).editor_on);
            Llamada a subrutina(RebuildKillOrbs);
            Llamada a subrutina(RebuildBounceOrbs);
            Llamada a subrutina(RebuildPortals);
        Si no;
            Si(Conteo de(Global.CustomPortalStart));
                Para variable global(NANBA, 0, Conteo de(Global.CustomPortalStart), Verdadero);
                    Crear efecto(Matriz filtrada(Todos los jugadores(Todos los equipos), O(Comparar((Elemento de matriz actual).checkpoint_current, ==, Evaluar una vez(Valor en la matriz(Global.CustomPortalCP, Global.NANBA))), Evaluar una vez(Comparar(Valor en la matriz(Global.CustomPortalCP, Global.NANBA), <, Nulo)))), Buena aura, Valor en la matriz(Global.ColorConfig, 17), Valor en la matriz(Global.CustomPortalStart, Global.NANBA), 0.6, Visible para);
                    Esperar(Falso, Ignorar condición);
                Fin;
                Esperar(0.5, Ignorar condición);
            Fin;
            Si(Conteo de(Global.H));
                Para variable global(NANBA, 0, Conteo de(Global.H), Verdadero);
                    Crear efecto(Matriz filtrada(Todos los jugadores(Todos los equipos), Comparar((Elemento de matriz actual).checkpoint_current, ==, Evaluar una vez(Valor en la matriz(Global.killballnumber, Global.NANBA)))), Esfera, Valor en la matriz(Global.ColorConfig, 14), Valor en la matriz(Global.H, Global.NANBA), Valor absoluto(Valor en la matriz(Global.I, Global.NANBA)), Visible para);
                    Esperar(Falso, Ignorar condición);
                Fin;
                Esperar(0.5, Ignorar condición);
            Fin;
            Si(Conteo de(Global.TQ));
                Para variable global(NANBA, 0, Conteo de(Global.TQ), Verdadero);
                    Crear efecto(Matriz filtrada(Anexar a la matriz(Todos los jugadores(Todos los equipos), Nulo), Y(Comparar((Elemento de matriz actual).checkpoint_current, ==, Evaluar una vez(Valor en la matriz(Global.pinballnumber, Global.NANBA))), No(La matriz contiene((Elemento de matriz actual).cache_collectedLocks, Evaluar una vez(Global.NANBA))))), Orbe, If-Then-Else(Valor en la matriz(Global.BounceToggleLock, Global.NANBA), Valor en la matriz(Global.ColorConfig, 16), Valor en la matriz(Global.ColorConfig, 15)), Valor en la matriz(Global.TQ, Global.NANBA), Verdadero, Visible para);
                    Esperar(Falso, Ignorar condición);
                Fin;
            Fin;
            "End portal preview"
            Crear efecto(If-Then-Else(Y(Y((Jugador local).preview_i, Comparar((Jugador local).preview_i, >, Conteo de((Jugador local).cache_bouncePosition))), Último de(Valor en la matriz((Jugador local).preview_array2, (Jugador local).preview_i))), Jugador local, Nulo), Chispas, Color(Morado), Valor en la matriz((Jugador local).preview_array1, (Jugador local).preview_i), 0.5, Visible para posición y radio);
    }
}

regla ("Effects | SUB Rebuild Bounce Orbs") {
    evento {
        Subrutina;
        RebuildBounceOrbs;
    }
    acciones {
        Destruir efecto(Global.TQ2);
        Establecer variable global(TQ2, Matriz vacía);
        Para variable global(NANBA, 0, Conteo de(Global.pinballnumber), Verdadero);
            Crear efecto(Matriz filtrada(Anexar a la matriz(Todos los jugadores(Todos los equipos), Nulo), Y(Comparar((Elemento de matriz actual).checkpoint_current, ==, Valor en la matriz(Global.pinballnumber, Evaluar una vez(Global.NANBA))), No(La matriz contiene((Elemento de matriz actual).cache_collectedLocks, Evaluar una vez(Global.NANBA))))), Orbe, If-Then-Else(Valor en la matriz(Global.BounceToggleLock, Evaluar una vez(Global.NANBA)), Valor en la matriz(Global.ColorConfig, 16), Valor en la matriz(Global.ColorConfig, 15)), Valor en la matriz(Global.TQ, Evaluar una vez(Global.NANBA)), Verdadero, Visible para posición radio y color);
            Modificar variable global(TQ2, Anexar a la matriz, Última entidad creada);
            "wait()"
            Si(No(Módulo(Global.NANBA, 5)));
                Esperar(Falso, Ignorar condición);
            Fin;
        Fin;
    }
}

regla ("Effects | SUB Rebuild boundary spheres") {
    evento {
        Subrutina;
        RebuildKillOrbs;
    }
    acciones {
        Destruir efecto(Global.K);
        Establecer variable global(K, Matriz vacía);
        Para variable global(NANBA, 0, Conteo de(Global.killballnumber), Verdadero);
            Crear efecto(Matriz filtrada(Anexar a la matriz(Todos los jugadores(Todos los equipos), Nulo), Comparar((Elemento de matriz actual).checkpoint_current, ==, Valor en la matriz(Global.killballnumber, Evaluar una vez(Global.NANBA)))), Esfera, Valor en la matriz(Global.ColorConfig, 14), Valor en la matriz(Global.H, Evaluar una vez(Global.NANBA)), Valor absoluto(Valor en la matriz(Global.I, Evaluar una vez(Global.NANBA))), Visible para posición y radio);
            Modificar variable global(K, Anexar a la matriz, Última entidad creada);
            Si(No(Módulo(Global.NANBA, 5)));
                Esperar(Falso, Ignorar condición);
            Fin;
        Fin;
    }
}

regla ("Effects | SUB Rebuild Portals") {
    evento {
        Subrutina;
        RebuildPortals;
    }
    acciones {
        Destruir efecto(Global.PortalEffects);
        Establecer variable global(PortalEffects, Matriz vacía);
        Si(Conteo de(Global.CustomPortalCP));
            Para variable global(NANBA, 0, Conteo de(Global.CustomPortalCP), Verdadero);
                Crear efecto(Matriz filtrada(Todos los jugadores(Todos los equipos), O(Comparar((Elemento de matriz actual).checkpoint_current, ==, Valor en la matriz(Global.CustomPortalCP, Evaluar una vez(Global.NANBA))), Comparar(Valor en la matriz(Global.CustomPortalCP, Evaluar una vez(Global.NANBA)), <, Nulo))), Buena aura, Valor en la matriz(Global.ColorConfig, 17), Valor en la matriz(Global.CustomPortalStart, Evaluar una vez(Global.NANBA)), 0.6, Visible para posición y radio);
                Modificar variable global(PortalEffects, Anexar a la matriz, Última entidad creada);
                Si(No(Módulo(Global.NANBA, 5)));
                    Esperar(Falso, Ignorar condición);
                Fin;
            Fin;
        Fin;
    }
}

regla ("<tx0C00000000001344> Mechanics | Checks <tx0C00000000001344>") {
    evento {
        En curso - Global;
    }
}

regla ("Mechanic | SUB Check Ultimate") {
    evento {
        Subrutina;
        CheckUlt;
    }
    acciones {
        Si((Jugador del evento).lockState);
            "for dash start etc you can be away from cp so the keep charge triggers"
            Establecer carga de habilidad máxima(Jugador del evento, Falso);
        Fin;
        "make sure the button cant be pressed until the entire rule ends even if it restarts"
        Deshabilitar botón(Jugador del evento, Botón(Habilidad máxima));
        "global cooldown that works even when rule is reset"
        Si(Comparar((Jugador del evento).skill_ultCd, >, Tiempo total transcurrido));
            Esperar(Restar((Jugador del evento).skill_ultCd, Tiempo total transcurrido), Ignorar condición);
        Si no;
            "Set cooldown"
            Establecer variable de jugador(Jugador del evento, skill_ultCd, Agregar(Tiempo total transcurrido, 0.36));
        Fin;
        Si(Está usando la habilidad máxima(Jugador del evento));
            Esperar hasta(No(Está usando la habilidad máxima(Jugador del evento)), 2);
            Esperar(Falso, Ignorar condición);
        Fin;
        "incase spamming the button"
        Si(Botón presionado(Jugador del evento, Botón(Habilidad máxima)));
            Esperar(Falso, Ignorar condición);
        Fin;
        Si(O(O((Jugador del evento).toggle_invincible, Y(Comparar(Jugador del evento, ==, Jugador anfitrión), (Jugador del evento).editor_on)), No((Jugador del evento).checkpoint_notLast)));
            "skip msg if these"
            Omitir(2);
        Si no si(Y(La matriz contiene(Global.Dao, (Jugador del evento).checkpoint_current), Comparar(Distancia entre(Jugador del evento, Último de(Valor en la matriz(Global.A, (Jugador del evento).checkpoint_current))), <=, 1.4)));
            Mensaje pequeño(Jugador del evento, Cadena personalizada("   {0} {1} ", Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad máxima)), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("终极技能已就绪"), Cadena personalizada("Ultimate is ready"))));
            //lbl_a:
            Esperar(Falso, Ignorar condición);
            Establecer habilidad máxima habilitada(Jugador del evento, Verdadero);
            Establecer carga de habilidad máxima(Jugador del evento, 100);
        "used to be just else, but have to deal with multi ult orbs"
        Si no si(O(Comparar(Distancia entre(Jugador del evento, Último de(Valor en la matriz(Global.A, (Jugador del evento).checkpoint_current))), <=, 2), Comparar(Porcentaje de carga de la habilidad máxima(Jugador del evento), <, 100)));
            Establecer habilidad máxima habilitada(Jugador del evento, Falso);
            Establecer carga de habilidad máxima(Jugador del evento, Falso);
        Fin;
        Habilitar botón(Jugador del evento, Botón(Habilidad máxima));
    }
}

regla ("Mechanic | SUB Check Dash") {
    evento {
        Subrutina;
        CheckDash;
    }
    acciones {
        Esperar hasta(No(Está utilizando la habilidad 1(Jugador del evento)), Verdadero);
        Si(O(O((Jugador del evento).toggle_invincible, Y(Comparar(Jugador del evento, ==, Jugador anfitrión), (Jugador del evento).editor_on)), No((Jugador del evento).checkpoint_notLast)));
            "skip msg if these"
            Omitir(2);
        Si no si(Y(La matriz contiene(Global.SHIFT, (Jugador del evento).checkpoint_current), Comparar(Distancia entre(Jugador del evento, Último de(Valor en la matriz(Global.A, (Jugador del evento).checkpoint_current))), <=, 1.4)));
            Mensaje pequeño(Jugador del evento, Cadena personalizada("   {0} {1}", Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad 1)), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("技能1影已就绪"), Cadena personalizada("Dash is ready"))));
            //lbl_a:
            Esperar(Falso, Ignorar condición);
            Establecer habilidad 1 habilitada(Jugador del evento, Verdadero);
        Si no;
            Establecer habilidad 1 habilitada(Jugador del evento, Falso);
        Fin;
    }
}

regla ("Mechanic | Ultimate") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Está usando la habilidad máxima(Jugador del evento) == Verdadero;
    }
    acciones {
        Esperar(1.8, Cancelar cuando es falso);
        Si(Y((Jugador del evento).checkpoint_notLast, No((Jugador del evento).toggle_invincible)));
            "disable primary fire because of slash exploit"
            Deshabilitar botón(Jugador del evento, Botón(Disparo principal));
        Fin;
        Esperar hasta(No(Está usando la habilidad máxima(Jugador del evento)), 2);
        Esperar(Falso, Ignorar condición);
        Habilitar botón(Jugador del evento, Botón(Disparo principal));
        "sets ult charge back if done with map etc"
        Comenzar regla(CheckUlt, Reiniciar regla);
    }
}

regla ("Mechanic | Dash") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Está utilizando la habilidad 1(Jugador del evento) == Verdadero;
    }
    acciones {
        Comenzar regla(CheckDash, Reiniciar regla);
    }
}

regla ("Mechanic | On Wall") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "This rule is also linked to the determination of wall climbing, please do not close/delete"
        En el muro(Jugador del evento) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Saltar)) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, skill_usedClimb, Verdadero);
    }
}

regla ("Mechanic | Emote") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Comunica un gesto(Jugador del evento) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, skill_usedBhop, Falso);
        Si((Jugador del evento).addon_toggle3rdPov);
            Establecer variable de jugador(Jugador del evento, addon_toggle3rdPov, Falso);
            Detener cámara(Jugador del evento);
        Fin;
        Si((Jugador del evento).ban_emote);
            Esperar hasta(No(Comunica un gesto(Jugador del evento)), 999999999999);
            Abortar si((Jugador del evento).toggle_invincible);
            Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   表情留小 ♥ 已禁用!"), Cadena personalizada("   Emote Savehop ♥ is banned!")));
            Esperar(Falso, Ignorar condición);
            Llamada a subrutina(CheckpointFailReset);
    }
}

regla ("Mechanic | Jump") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "@Condition eventPlayer.skill_usedBhop == false"
        Está saltando(Jugador del evento) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, skill_usedBhop, Verdadero);
        "Bhop"
        Si((Jugador del evento).skill_usedHop);
            Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   小跳已用"), Cadena personalizada("   Bhop")));
        "Hop"
        Si no;
            Establecer variable de jugador(Jugador del evento, skill_usedHop, Verdadero);
    }
}

regla ("Mechanic | No Jump") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        (Jugador del evento).skill_usedHop == Nulo;
        En el suelo(Jugador del evento) == Falso;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, skill_usedHop, Verdadero);
    }
}

regla ("Mechanic | Bhop count for stand ban") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Está saltando(Jugador del evento) == Verdadero;
        (Jugador del evento).ban_standcreate != Falso;
    }
    acciones {
        Modificar variable de jugador(Jugador del evento, skill_countBhops, Agregar, Verdadero);
        Si(Y(Comparar((Jugador del evento).skill_countBhops, >, 1), No((Jugador del evento).toggle_invincible)));
            Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   站卡 ♠ 已禁用!"), Cadena personalizada("   Stand createBhop ♠ is banned!")));
            Llamada a subrutina(CheckpointFailReset);
    }
}

regla ("Mechanic | Create Bhop") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Botón presionado(Jugador del evento, Botón(Agacharse)) == Verdadero;
        Agachado(Jugador del evento) == Verdadero;
        En el aire(Jugador del evento) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Saltar)) == Falso;
        Está saltando(Jugador del evento) == Falso;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, skill_usedBhop, Falso);
        "prevent restart from giving messsage, but stil allow it to become green"
        Abortar si((Jugador del evento).lockState);
        Si(Y((Jugador del evento).ban_create, No((Jugador del evento).toggle_invincible)));
            Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   卡小 ♂ 已禁用!"), Cadena personalizada("   Create Bhop ♂ is banned!")));
            Llamada a subrutina(CheckpointFailReset);
        Si no;
            Si(Y((Jugador del evento).ban_standcreate, Comparar((Jugador del evento).skill_countBhops, >, Nulo)));
                Modificar variable de jugador(Jugador del evento, skill_countBhops, Restar, Verdadero);
            Fin;
            Modificar variable de jugador(Jugador del evento, skill_countCreates, Agregar, Verdadero);
            Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   success!"), Cadena personalizada("   Bhop has been created!")));
    }
}

regla ("Mechanic | Ground Reset") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        En el suelo(Jugador del evento) == Verdadero;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, skill_usedHop, Nulo);
        Establecer variable de jugador(Jugador del evento, skill_usedClimb, Falso);
        Establecer variable de jugador(Jugador del evento, skill_countMulti, Nulo);
        Establecer variable de jugador(Jugador del evento, skill_countCreates, Nulo);
        Establecer variable de jugador(Jugador del evento, skill_countBhops, Nulo);
        Establecer variable de jugador(Jugador del evento, skill_usedDouble, Nulo);
    }
}

regla ("Mechanic | Bhop Reset") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        En el suelo(Jugador del evento) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Saltar)) == Falso;
    }
    acciones {
        Establecer variable de jugador(Jugador del evento, skill_usedBhop, Falso);
    }
}

regla ("Mechanic | Double Jump") {
    evento {
        En curso - Cada jugador;
        Todos;
        Genji;
    }
    condiciones {
        Está vivo(Jugador del evento) == Verdadero;
        En el suelo(Jugador del evento) == Falso;
        O(O((Jugador del evento).ban_djump, (Jugador del evento).ban_savedouble), (Jugador del evento).addon_enableDoubleChecks) == Verdadero;
    }
    acciones {
        "Save drop"
        Esperar hasta(O(O(En el suelo(Jugador del evento), Está saltando(Jugador del evento)), Botón presionado(Jugador del evento, Botón(Saltar))), 0.096);
        Abortar si la condición es falsa;
        Mientras(Verdadero);
            "Released Jump"
            Esperar hasta(O(En el suelo(Jugador del evento), No(Botón presionado(Jugador del evento, Botón(Saltar)))), 999999999999);
            Abortar si la condición es falsa;
            "Double Jumped"
            Esperar hasta(O(En el suelo(Jugador del evento), Botón presionado(Jugador del evento, Botón(Saltar))), 999999999999);
            Abortar si la condición es falsa;
            Establecer variable de jugador(Jugador del evento, skill_usedDouble, Verdadero);
            "Reset"
            Esperar hasta(O(En el suelo(Jugador del evento), No((Jugador del evento).skill_usedDouble)), 999999999999);
            Abortar si la condición es falsa;
        Fin;
    }
}

regla ("Mechanic | Multiclimb") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        En el muro(Jugador del evento) == Verdadero;
        Botón presionado(Jugador del evento, Botón(Saltar)) == Falso;
        (Jugador del evento).skill_usedClimb == Falso;
    }
    acciones {
        Esperar(Falso, Ignorar condición);
        Si(Y(En el muro(Jugador del evento), No(Botón presionado(Jugador del evento, Botón(Saltar)))));
            "AutoClimb used"
            Establecer variable de jugador(Jugador del evento, skill_usedClimb, Verdadero);
        Si no;
            Si(Y(Y((Jugador del evento).ban_multi, (Jugador del evento).checkpoint_notLast), No((Jugador del evento).toggle_invincible)));
                Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   蹭留 ∞ 已禁用!"), Cadena personalizada("   Multiclimb ∞ is banned!")));
                Llamada a subrutina(CheckpointFailReset);
            Si no;
                Modificar variable de jugador(Jugador del evento, skill_countMulti, Agregar, Verdadero);
    }
}

regla ("Mechanic | Ban Wallclimb - Message") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        (Jugador del evento).ban_climb != Falso;
        (Jugador del evento).toggle_invincible == Falso;
        (Jugador del evento).skill_usedClimb != Falso;
    }
    acciones {
        "CheckpointFailReset()\\neventPlayer.setStatusEffect(null,Status.BURNING, 0.1)"
        Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   爬墙 ↑ 已禁用!"), Cadena personalizada("   Climb ↑ is banned!")));
    }
}

regla ("Mechanic | Ban Save Double - 封禁二段跳") {
    evento {
        En curso - Cada jugador;
        Todos;
        Genji;
    }
    condiciones {
        (Jugador del evento).ban_savedouble != Falso;
        (Jugador del evento).toggle_invincible == Falso;
        En el suelo(Jugador del evento) == Falso;
        (Jugador del evento).skill_usedDouble == Falso;
        Botón presionado(Jugador del evento, Botón(Saltar)) == Verdadero;
    }
    acciones {
        Esperar hasta(O(O(Comparar(Componente Z de(Aceleración de(Jugador del evento)), >, Nulo), En el suelo(Jugador del evento)), No(Botón presionado(Jugador del evento, Botón(Saltar)))), 999999999999);
        Abortar si la condición es falsa;
        Esperar hasta(O(O(Comparar(Componente Z de(Aceleración de(Jugador del evento)), <=, Nulo), En el suelo(Jugador del evento)), No(Botón presionado(Jugador del evento, Botón(Saltar)))), 999999999999);
        Abortar si la condición es falsa;
        "Prevent false positives\\nDefault climb speed is 7.8 and small slowdown upon mantling"
        Repetir si(Comparar(Velocidad vertical de(Jugador del evento), <, 6));
        Si((Jugador del evento).skill_usedBhop);
            Esperar(0.8, Cancelar cuando es falso);
        Si no;
            Esperar(0.8, Cancelar cuando es falso);
            Abortar si((Jugador del evento).skill_usedBhop);
        Fin;
        Mensaje pequeño(Jugador del evento, If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("   延二段跳已禁用!"), Cadena personalizada("   save double banned!")));
        Llamada a subrutina(CheckpointFailReset);
    }
}

regla ("<tx0C00000000001344> Addon Functions <tx0C00000000001344>") {
    evento {
        En curso - Global;
    }
}

regla ("Addon | AFK timer") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        En movimiento(Jugador del evento) == Falso;
        Está vivo(Jugador del evento) == Verdadero;
        Comunica un gesto(Jugador del evento) == Falso;
        (Jugador del evento).editor_on == Falso;
    }
    acciones {
        Esperar(300, Cancelar cuando es falso);
        Si((Jugador del evento).addon_toggle3rdPov);
            Establecer variable de jugador(Jugador del evento, addon_toggle3rdPov, Falso);
        Fin;
        Establecer estado(Jugador del evento, Nulo, Dormido, 999999999999);
        "raycast to prevent camera stuck on low wall"
        Comenzar cámara(Jugador del evento, Agregar(Posición de(Jugador del evento), Multiplicar(Arriba, Restar(Distancia entre(Posición de(Jugador del evento), Posición de impacto de lanzamiento de rayo(Posición de(Jugador del evento), Agregar(Posición de(Jugador del evento), Multiplicar(4, Arriba)), Nulo, Nulo, Falso)), Verdadero))), Posición de(Jugador del evento), 10);
        "cancel it after jumping or not sleep, reset cures sleep"
        Esperar(Verdadero, Ignorar condición);
        Esperar hasta(O(Botón presionado(Jugador del evento, Botón(Saltar)), No(Tiene estado(Jugador del evento, Dormido))), 999999999999);
        Eliminar estado(Jugador del evento, Dormido);
        Detener cámara(Jugador del evento);
        Si(Y((Jugador del evento).checkpoint_notLast, No((Jugador del evento).toggle_invincible)));
            Llamada a subrutina(CheckpointFailReset);
        Fin;
        Repetir si la condición es verdadera;
    }
}

regla ("Addon | Pre-set control map portal - toggled via workshop") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Global.PortalOn != Falso;
        Conteo de(Global.PortalLoc) != Nulo;
        O((Jugador del evento).toggle_invincible, No((Jugador del evento).checkpoint_notLast)) == Verdadero;
        Es verdadero para cualquiera(Global.PortalLoc, Comparar(Distancia entre(Elemento de matriz actual, Agregar(Posición de(Jugador del evento), Multiplicar(0.2, Arriba))), <, 1.3)) == Verdadero;
    }
    acciones {
        Transportar(Jugador del evento, Primero de(Matriz ordenada(Global.PortalDest, Distancia entre(Jugador del evento, Valor en la matriz(Global.PortalLoc, Índice de matriz actual)))));
    }
}

regla ("Addon | Custom portals") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Conteo de((Jugador del evento).cache_portalStart) != Nulo;
        Es verdadero para cualquiera((Jugador del evento).cache_portalStart, Comparar(Distancia entre(Elemento de matriz actual, Agregar(Posición de(Jugador del evento), Multiplicar(0.2, Arriba))), <, 1.3)) == Verdadero;
    }
    acciones {
        Transportar(Jugador del evento, Primero de(Matriz ordenada((Jugador del evento).cache_portalEnd, Distancia entre(Jugador del evento, Valor en la matriz((Jugador del evento).cache_portalStart, Índice de matriz actual)))));
        Esperar(0.4, Ignorar condición);
    }
}

regla ("Addon | Pre-set control map portal - toggled on via workshop settings") {
    evento {
        En curso - Global;
    }
    condiciones {
        Global.PortalOn != Falso;
    }
    acciones {
        "overwrite pasta"
        Esperar(0.752, Ignorar condición);
        Si(Comparar(Mapa actual, ==, Mapa(Busan)));
            "\\"down > sanc\\",\\"down > meka\\",\\"sanc > down\\",\\"sanc > meka\\",\\"meka > sanc\\",\\"meka > down\\""
            Establecer variable global(PortalNames, Matriz(Cadena personalizada("Sanctuary"), Cadena personalizada("MEKA base"), Cadena personalizada("Downtown"), Cadena personalizada("MEKA base"), Cadena personalizada("Sanctuary"), Cadena personalizada("Downtown")));
            Establecer variable global(PortalLoc, Matriz(Vector(47.946, 7.248, -93.922), Vector(55.921, 6.998, -94.024), Vector(-326.382, 10.81, 117.261), Vector(-330.96, 10.81, 117.416), Vector(219.567, 10.215, 243.653), Vector(225.976, 10.227, 240.799)));
            Establecer variable global(PortalDest, Matriz(Vector(-328.552, 10.01, 120.82), Vector(221.152, 9.376, 238.765), Vector(52.197, 6.301, -97.513), Vector(221.271, 9.431, 238.978), Vector(-328.601, 10.01, 120.823), Vector(52.197, 6.299, -97.513)));
        Si no si(Comparar(Mapa actual, ==, Mapa(Ilios)));
            "\\"light > ruin\\",\\"light > well\\",\\"ruin > light\\",\\"ruin > well\\",\\"well > light\\",\\"well > ruin\\""
            Establecer variable global(PortalNames, Matriz(Cadena personalizada("Ruins"), Cadena personalizada("Well"), Cadena personalizada("Lighthouse"), Cadena personalizada("Well"), Cadena personalizada("Lighthouse"), Cadena personalizada("Ruins")));
            Establecer variable global(PortalLoc, Matriz(Vector(325.722, -22.665, -40.401), Vector(327.43, -22.665, -36.089), Vector(26.176, 58.367, -156.415), Vector(30.472, 58.367, -156.307), Vector(-199.945, 2.015, -2.918), Vector(-194.93, 2.015, -8.054)));
            Establecer variable global(PortalDest, Matriz(Vector(28.375, 57.659, -161.195), Vector(-200.464, 1.306, -8.604), Vector(333.088, -23.389, -40.933), Vector(-200.464, 1.306, -8.604), Vector(333.088, -23.389, -40.933), Vector(28.375, 57.829, -161.195)));
        Si no si(O(Comparar(Mapa actual, ==, Mapa(Torre Lijiang)), Comparar(Mapa actual, ==, Mapa(Torre Lijiang Año Nuevo Lunar))));
            "\\"control > garden\\",\\"control > market\\",\\"garden > control\\",\\"garden > market\\",\\"market > control\\",\\"market > garden\\""
            Establecer variable global(PortalNames, Matriz(Cadena personalizada("Garden"), Cadena personalizada("Night Market"), Cadena personalizada("Control Center"), Cadena personalizada("Night Market"), Cadena personalizada("Control Center"), Cadena personalizada("Garden")));
            Establecer variable global(PortalLoc, Matriz(Vector(-2.815, 271, 295.373), Vector(2.905, 271, 295.052), Vector(5.788, 95.056, 135.298), Vector(-5.343, 95.05, 134.638), Vector(-2.738, Falso, -61.911), Vector(5.043, Falso, -61.879)));
            Establecer variable global(PortalDest, Matriz(Vector(0.286, 94.292, 140.396), Vector(0.584, -0.709, -54.469), Vector(0.245, 270.292, 301.428), Vector(0.773, -0.708, -54.361), Vector(0.245, 270.292, 301.428), Vector(0.286, 94.292, 140.396)));
        Si no si(Comparar(Mapa actual, ==, Mapa(Nepal)));
            "\\"vil > shrine\\",\\"vil > sanc\\", \\"shrine > vil\\",\\"shrine > sanc\\",#\\"sanc > vil\\",\\"sanc > shrine\\""
            Establecer variable global(PortalNames, Matriz(Cadena personalizada("Shrine"), Cadena personalizada("Sanctum"), Cadena personalizada("Village"), Cadena personalizada("Sanctum"), Cadena personalizada("Village"), Cadena personalizada("Shrine")));
            Establecer variable global(PortalLoc, Matriz(Vector(-194.732, -92.86, -3.802), Vector(-194.585, -92.86, 4.187), Vector(-33.165, 14, 5.212), Vector(-33.058, 14, -5.55), Vector(84.75, 129.008, -3.624), Vector(84.534, 129, 4.032)));
            Establecer variable global(PortalDest, Matriz(Vector(-40.19, 13.292, -0.105), Vector(78.43, 128.292, 0.149), Vector(-190.54, -93.569, 0.122), Vector(78.43, 128.292, 0.149), Vector(-190.54, -93.569, 0.122), Vector(-40.19, 13.292, -0.105)));
        Si no si(Comparar(Mapa actual, ==, Mapa(Oasis)));
            "\\"uni > garden\\",\\"uni > city\\",\\"garden > uni\\",\\"garden > city\\",\\"city > garden\\",\\"city > uni\\""
            Establecer variable global(PortalNames, Matriz(Cadena personalizada("Gardens"), Cadena personalizada("City Center"), Cadena personalizada("University"), Cadena personalizada("City Center"), Cadena personalizada("Gardens"), Cadena personalizada("University")));
            Establecer variable global(PortalLoc, Matriz(Vector(-211.137, 20, -5.084), Vector(-211.346, 20, 5.029), Vector(143.061, 8.377, -245.04), Vector(139.333, 8.377, -249.964), Vector(157.297, 12.522, 255.759), Vector(151.452, 12.522, 261.099)));
            Establecer variable global(PortalDest, Matriz(Vector(134.366, 7.829, -240.53), Vector(158.27, 11.814, 262.272), Vector(-206.269, 19.292, 0.103), Vector(158.283, 11.814, 262.283), Vector(134.318, 7.829, -240.667), Vector(-206.269, 19.292, 0.103)));
        Si no si(Comparar(Mapa actual, ==, Mapa(Península Antártica)));
            Establecer variable global(PortalNames, Matriz(Cadena personalizada("labs"), Cadena personalizada("icebreaker"), Cadena personalizada("Sublevel"), Cadena personalizada("icebreaker"), Cadena personalizada("labs"), Cadena personalizada("Sublevel")));
            Establecer variable global(PortalLoc, Matriz(Vector(280.66, -12.15, -223.65), Vector(273.27, 42.74, 198.15), Vector(266.58, 42.74, 198.17), Vector(-58.29, -154, 63.03), Vector(-58.36, -154, 56.47), Vector(287.08, -12.15, -223.59)));
            Establecer variable global(PortalDest, Matriz(Vector(270, 42.7, 190.44), Vector(284.07, -12.75, -216.15), Vector(-53.51, -154.5, 60.08), Vector(284.07, -12.75, -216.15), Vector(270, 42.7, 190.44), Vector(-53.51, -154.5, 60.08)));
        Si no si(Comparar(Mapa actual, ==, Mapa(Samoa)));
            Establecer variable global(PortalNames, Matriz(Cadena personalizada("beach"), Cadena personalizada("volcano"), Cadena personalizada("downtown"), Cadena personalizada("volcano"), Cadena personalizada("beach"), Cadena personalizada("downtown")));
            Establecer variable global(PortalLoc, Matriz(Vector(231.98, 7.23, -262.84), Vector(236.78, 7.23, -262.75), Vector(-327.59, 3.6, -108.69), Vector(-332.71, 3.6, -108.59), Vector(25.4, 341, 354.38), Vector(30, 341, 354.34)));
            Establecer variable global(PortalDest, Matriz(Vector(-329.86, 3.05, -103.4), Vector(27.59, 339.76, 348.77), Vector(234.07, 6.12, -266.88), Vector(27.59, 339.76, 348.77), Vector(-329.86, 3.05, -103.4), Vector(234.07, 6.12, -266.88)));
    }
}

regla ("Addon | Little destructo - fence breaker") {
    evento {
        En curso - Global;
    }
    acciones {
        "Made by FishoFire version 1.0\\nwait to overwrite any from copy pastas"
        Esperar(0.032, Ignorar condición);
        "first entry will act as index, rest is the points themselves"
        Establecer variable global(MapVectorArray, Matriz(Nulo));
        "tdm/dm = first spawn points, the maps are not big so it just covers entire map. all teams defaults to team 1 spawn\\npush: payload and cp 0 are set but rest isnt. normal payload maps have more then 1 point.\\nrest of maps have up to 3 points"
        Modificar variable global(MapVectorArray, Anexar a la matriz, If-Then-Else(Comparar(Modo de juego actual, ==, Modo de juego(Captura la bandera)), Matriz(Posición de la bandera(Equipo 1), Posición de la bandera(Equipo 2)), If-Then-Else(La matriz contiene(Matriz(Modo de juego(Combate a muerte por equipos), Modo de juego(Combate a muerte)), Modo de juego actual), Primero de(Puntos de aparición(Todos los equipos)), If-Then-Else(Y(Primero de(Posición de la carga), No(Agregar(Posición del objetivo(Verdadero), Posición del objetivo(2)))), Posición de la carga, Matriz(Posición del objetivo(Falso), Posición del objetivo(Verdadero), Posición del objetivo(2))))));
        "explode in a grid around the selected points"
        Mientras(Comparar(Conteo de(Global.MapVectorArray), >, 1));
            Establecer variable global según el índice(MapVectorArray, Falso, Nulo);
            Mientras(Comparar(Primero de(Global.MapVectorArray), <, 256));
                Crear proyectil(Proyectil del Orbe, Nulo, Agregar(Agregar(Restar(Valor en la matriz(Global.MapVectorArray, Verdadero), Vector(240, Falso, 240)), Multiplicar(Módulo(Primero de(Global.MapVectorArray), 16), Multiplicar(30, Izquierda))), Multiplicar(Redondear a número entero(Dividir(Primero de(Global.MapVectorArray), 16), Abajo), Multiplicar(30, Adelante))), Abajo, Al mundo, Sanar, Equipo 1, 0, 0, 30, Buena explosión, Sonido de explosión, 1, 1, 0, 0, 0, 0);
                Modificar variable global según el índice(MapVectorArray, Falso, Agregar, Verdadero);
                "use modulo to only wait every x orbs keep the 0 change the other number"
                Si(No(Módulo(Primero de(Global.MapVectorArray), 3)));
                    Esperar(Falso, Ignorar condición);
                Fin;
            Fin;
            Modificar variable global(MapVectorArray, Eliminar de la matriz por índice, Verdadero);
        Fin;
        "handle exceptions (looking at you new queen street)"
        Establecer variable global(MapVectorArray, Matriz(Vector(8.276, 4.113, 15.261), Vector(-8.319, 2.624, 14.245), Vector(0.006, 4.821, 18.513)));
        Mientras(Conteo de(Global.MapVectorArray));
            "same as other projectile before"
            Crear proyectil(Proyectil del Orbe, Nulo, Primero de(Global.MapVectorArray), Abajo, Al mundo, Sanar, Equipo 1, 0, 0, 30, Buena explosión, Sonido de explosión, 1, 1, 0, 0, 0, 0);
            Modificar variable global(MapVectorArray, Eliminar de la matriz por índice, Falso);
            Esperar(Falso, Ignorar condición);
        Fin;
        Establecer variable global(MapVectorArray, Nulo);
    }
}

regla ("Addon | Cache jump & crouch inputs for spectators") {
    evento {
        El jugador se unió a la partida;
        Todos;
        Todos;
    }
    acciones {
        Esperar(Falso, Ignorar condición);
        Establecer variable de jugador(Jugador del evento, cache_inputs, Vector(Botón presionado(Jugador del evento, Botón(Saltar)), Botón presionado(Jugador del evento, Botón(Agacharse)), Falso));
        Bucle;
    }
}

regla ("Addon | SUB Basic Map Validator") {
    evento {
        Subrutina;
        AddonCheckMap;
    }
    acciones {
        Abortar si(Comparar(Conteo de(Global.A), <=, 1));
        Crear robot de entrenamiento(Héroe(Ana), If-Then-Else(Comparar(Cantidad de puestos(Equipo 1), <, Cantidad de puestos(Equipo 2)), Equipo 1, Equipo 2), -1, Primero de(Global.A), Nulo);
        Establecer variable global(MsDestructo, Última entidad creada);
        Deshabilitar colisión de movimiento con entorno(Global.MsDestructo, Falso);
        Establecer estado(Global.MsDestructo, Nulo, Forma etérea, 999999999999);
        Establecer invisibilidad(Global.MsDestructo, Todos);
        Iniciar escala de jugador(Global.MsDestructo, 3.111111111111110, Falso);
        Establecer gravedad(Global.MsDestructo, 999999999999);
        Esperar hasta(Ha aparecido(Global.MsDestructo), 999999999999);
        Para variable de jugador(Global.MsDestructo, checkpoint_current, 1, Conteo de(Global.A), Verdadero);
            Si(Y(Primero de(Posición caminable más cercana(Valor en la matriz(Global.A, (Global.MsDestructo).checkpoint_current))), Comparar(Distancia entre(Valor en la matriz(Global.A, (Global.MsDestructo).checkpoint_current), Posición caminable más cercana(Valor en la matriz(Global.A, (Global.MsDestructo).checkpoint_current))), >, 1.4)));
                Comenzar a forzar la posición del jugador(Global.MsDestructo, Posición de impacto de lanzamiento de rayo(Agregar(Valor en la matriz(Global.A, (Global.MsDestructo).checkpoint_current), Multiplicar(1.4, Arriba)), Agregar(Valor en la matriz(Global.A, (Global.MsDestructo).checkpoint_current), Multiplicar(-1.4, Arriba)), Matriz vacía, Matriz vacía, Falso), Verdadero);
                Esperar(0.112, Ignorar condición);
                Dejar de forzar la posición del jugador(Global.MsDestructo);
                Esperar hasta(En el suelo(Global.MsDestructo), Verdadero);
                Omitir si(Y(En el suelo(Global.MsDestructo), Comparar(Distancia entre(Global.MsDestructo, Valor en la matriz(Global.A, (Global.MsDestructo).checkpoint_current)), <=, 1.4)), 11);
                Para variable de jugador(Global.MsDestructo, checkpoint_practice, 1.4, 1.2, -0.2);
                    Comenzar a forzar la posición del jugador(Global.MsDestructo, Agregar(Valor en la matriz(Global.A, (Global.MsDestructo).checkpoint_current), Multiplicar(Arriba, (Global.MsDestructo).checkpoint_practice)), Verdadero);
                    Esperar(0.112, Ignorar condición);
                    Dejar de forzar la posición del jugador(Global.MsDestructo);
                    Esperar hasta(En el suelo(Global.MsDestructo), Verdadero);
                    Omitir si(Y(En el suelo(Global.MsDestructo), Comparar(Distancia entre(Global.MsDestructo, Valor en la matriz(Global.A, (Global.MsDestructo).checkpoint_current)), <=, 1.4)), 5);
                Fin;
                Activar registro de Inspector;
                Registro para Inspector(Cadena personalizada("Fail {0}", (Global.MsDestructo).checkpoint_current));
                Desactivar registro de Inspector;
            Fin;
            //lbl_MapChecker_nextCp:
        Fin;
        Destruir robot de entrenamiento(Equipo de(Global.MsDestructo), Puesto de(Global.MsDestructo));
        Establecer variable global(MsDestructo, Nulo);
        Activar registro de Inspector;
        Registro para Inspector(Cadena personalizada("■ Map Check Complete ■"));
        Desactivar registro de Inspector;
    }
}

regla ("Addon | SUB 3rd Person Camera") {
    evento {
        Subrutina;
        Addon3rdPerson;
    }
    acciones {
        Si((Jugador del evento).addon_toggle3rdPov);
            Comenzar cámara(Jugador del evento, Actualizar todos los cuadros(Agregar(Posición de impacto de lanzamiento de rayo(Agregar(Multiplicar(0.5, Arriba), Posición de la vista(Jugador del evento)), Agregar(Agregar(Multiplicar(0.5, Arriba), Posición de la vista(Jugador del evento)), Multiplicar(-3.5, Dirección de orientación de(Jugador del evento))), Matriz vacía, Matriz vacía, Falso), Multiplicar(0.5, Dirección de orientación de(Jugador del evento)))), Actualizar todos los cuadros(Agregar(Multiplicar(0.5, Arriba), Posición de la vista(Jugador del evento))), Falso);
        Si no;
            Detener cámara(Jugador del evento);
        Fin;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入") {
    evento {
        En curso - Global;
    }
}

regla ("<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入") {
    evento {
        En curso - Global;
    }
    acciones {
        Esperar(Falso, Ignorar condición);
        "Filling this in adds it to the inspector pasta after next restart.\\nYou can fill in again to overwrite.\\n修改的内容 在重新开始 比赛后生效\\n您可以反复 修改字符串 中的内容"
        Establecer variable global(Name, Cadena personalizada("name here - 作者"));
        Establecer variable global(Code, Cadena personalizada("code here - 代码"));
        "+++++  +++++  +++++  +++++  +++++  +++++\\ncolor customization below / 自定义 颜色(实体、HUD)\\n+++++  +++++  +++++  +++++  +++++  +++++\\n\\ncredit hud name   -   作者HUD"
        Establecer variable global según el índice(ColorConfig, Falso, Color(Violeta));
        "credit hud code   -   代码HUD"
        Establecer variable global según el índice(ColorConfig, Verdadero, Color(Azul cielo));
        "dsc.gg/genjiparkour"
        Establecer variable global según el índice(ColorConfig, 18, Color(Aguamarina));
        "server time hud   -   房间倒计时"
        Establecer variable global según el índice(ColorConfig, 2, Color(Rojo));
        "time  hud   -   单关用时HUD"
        Establecer variable global según el índice(ColorConfig, 3, Color(Blanco));
        "level hud   -   关卡HUD"
        Establecer variable global según el índice(ColorConfig, 4, Color(Blanco));
        "command hud   -   指令HUD"
        Establecer variable global según el índice(ColorConfig, 5, Color(Blanco));
        "command hud highlight   -   指令HUD高亮"
        Establecer variable global según el índice(ColorConfig, 6, Color(Verde));
        "bhop/climb available   -   小跳/爬墙未用HUD"
        Establecer variable global según el índice(ColorConfig, 7, Color(Verde));
        "bhop/climb used (cant be same as available)   -   小跳/爬墙已用HUD"
        Establecer variable global según el índice(ColorConfig, 8, Color(Rojo));
        "current checkpoint ring   -   当前检查点光圈"
        Establecer variable global según el índice(ColorConfig, 9, Color(Azul cielo));
        "next checkpoint ring   -   下一关检查点光圈"
        Establecer variable global según el índice(ColorConfig, 10, Color(Verde lima));
        "next checkpoint light shaft   -   下一关检查点光柱"
        Establecer variable global según el índice(ColorConfig, 11, Color(Blanco));
        "next checkpoint icon   -   下一关检查点图标"
        Establecer variable global según el índice(ColorConfig, 12, Color(Azul cielo));
        "\\"come here\\" text   -   到这里来\\" 文本"
        Establecer variable global según el índice(ColorConfig, 13, Color(Blanco));
        "kill orbs   -   击杀球"
        Establecer variable global según el índice(ColorConfig, 14, Color(Azul));
        "normal orbs   -   弹球"
        Establecer variable global según el índice(ColorConfig, 15, Color(Verde));
        "lock orbs (overwritten if its same as normal)\\n收集球 (与普通弹 球相同时将 自动覆写)"
        Establecer variable global según el índice(ColorConfig, 16, Color(Naranja));
        "portals   -   自定义 传送门"
        Establecer variable global según el índice(ColorConfig, 17, Color(Blanco));
    }
}

regla ("Instructions for Depricated Rules (ban / portal / dash /ult) - 旧版编辑器中已弃用规则指引 (单关封禁 / 传送门 / 给刀给S)") {
    evento {
        En curso - Global;
    }
    acciones {
        "The following rules should now be handled with the ingame editor\\n- Ban per checkpoint\\n- Dash/Ult per checkpoint\\n- Custom portals"
        Abortar;
        "When updating old maps, these things should be added to your map data.\\nThis is done with the instructions below"
        Abortar;
        "step 1) Open the old rule\\nstep 2) Select the variables and press copy\\n(do not select waits or workshop toggles, only select variables)\\nstep 3) Go to map data rule and paste this the variables"
        Abortar;
        "以下规则现在 要用游戏内置 编辑器编辑\\n- 单关 封禁(卡小、蹭留等)\\n- 检查点给 刀给S\\n- 自定义 传送门"
        Abortar;
        "当更新旧 图数据 时，以上 这些东西 应该放 到地图 数据里\\n以下是一 些更新旧 图数据 指引:"
        Abortar;
        "步骤 1) 找到旧图 数据的 规则\\n步骤 2) 选中旧图 数据的 全局变 量并复制\\n(不要复制含 等待 地图工坊设置 的指令, 只要 全局变量 的数据)\\n步骤 3) 将全局变 量数据粘 贴到新版 编辑器的 地图数 据规则"
        Abortar;
    }
}

regla ("<tx0C00000000001344> Addons Settings & Data - 附加组件 <tx0C00000000001344>") {
    evento {
        En curso - Global;
    }
}

regla ("Addon | Comp Mode instruction message - 竞赛模式指引消息 <---- INSERT HERE / 在这输入") {
    evento {
        En curso - Global;
    }
    acciones {
        Esperar(0.4, Ignorar condición);
        "Instructions that show when you start comp mode.\\nDue to the hud text limit, you there is 4 huds available.\\nIf you dont need a field just empty the textfield."
        Abortar;
        "竞赛模式 指引消息\\n指引消息将 会在竞赛模 式开始时 显示\\n由于 hud 文本限制，你有 4 个hud可用\\n如果你不需 要一个字段 只是空文 本字段"
        Establecer variable global(instructiontext, Matriz(Cadena personalizada("Change in Comp Mode instruction message hud 1"), Cadena personalizada("Change in Comp Mode instruction message hud 2"), Cadena personalizada("Change in Comp Mode instruction message hud 3"), Cadena personalizada("Change in Comp Mode instruction message hud 4")));
    }
}

deshabilitado regla ("Addon | Custom difficulty hud  - 自定义难度hud <---- INSERT HERE / 在这输入") {
    evento {
        En curso - Global;
    }
    acciones {
        "1) workshop settings > difficulty > set to \\"dont display\\"\\n2) enable this rule\\n3) type your difficulty in the hud below"
        Esperar(2.5, Ignorar condición);
        "1) 地图工坊设 置难度改为 “不显示”\\n2) 勾选此规则 点击上方的 开启/关闭 开启此规则\\n3) 修改下面的 创建hud文本 中的“enter custom difficulty here”"
        Crear texto del HUD(Primero de(Verdadero), If-Then-Else(Último de(Global.Difficultyhud), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("游戏测试"), Cadena personalizada("Playtest")), Matriz vacía), Cadena personalizada("enter custom difficulty here"), Nulo, Arriba, -173, Color(Azul), Color(Verde), Nulo, Visible para y cadena, Visibilidad predeterminada);
        Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
    }
}

deshabilitado regla ("Addon | Title Data - 标题数据 <---- EDIT ME / 在此处编辑") {
    evento {
        En curso - Global;
    }
    acciones {
        "enable this rule and fill in the title data below.\\n启用此规则 并填写下面 的标题数据"
        Esperar(0.768, Ignorar condición);
        "checkpoint number\\n每关数量"
        Establecer variable global según el índice(TitleData, Falso, Matriz(Nulo, 10, 20, 30, 40, 50));
        "title\\n标题文本"
        Establecer variable global según el índice(TitleData, Verdadero, Matriz(Cadena personalizada("Bunny"), Cadena personalizada("Jumper"), Cadena personalizada("Ninja"), Cadena personalizada("Pro"), Cadena personalizada("Expert"), Cadena personalizada("Master")));
        "color\\n颜色"
        Establecer variable global según el índice(TitleData, 2, Matriz(Color(Verde lima), Color(Blanco), Color(Amarillo), Color(Naranja), Color(Morado), Color(Rojo)));
    }
}

deshabilitado regla ("Addon | Friend Title - 朋友称号 <---- DISPLAY MESSAGE HERE (ON PLAYER)") {
    evento {
        El jugador se unió a la partida;
        Todos;
        Todos;
    }
    acciones {
        "\\"your nickname\\" your friends ingame name\\n\\"display title\\" fill in the custom title\\n修改字符串 \\"your nickname <-------\\" 为好友名字 区分大小写\\n修改字符串 \\"display title\\" 为好友头顶 显示的称号"
        Esperar hasta(Ha aparecido(Jugador del evento), 999999999999);
        Si(Comparar(Cadena personalizada("your nickname <-------"), ==, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)));
            Mensaje grande(Primero de(Verdadero), Cadena personalizada("Message to the whole room"));
            Crear texto dentro del mundo(Primero de(Verdadero), Cadena personalizada("display title"), Jugador del evento, 1.5, Atravesar las superficies, Visible para posición y cadena, Color(Naranja), Visibilidad predeterminada);
        Fin;
        Si(Comparar(Cadena personalizada("your nickname <-------"), ==, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)));
            Mensaje grande(Primero de(Verdadero), Cadena personalizada("Message to the whole room"));
            Crear texto dentro del mundo(Primero de(Verdadero), Cadena personalizada("display title"), Jugador del evento, 1.5, Atravesar las superficies, Visible para posición y cadena, Color(Naranja), Visibilidad predeterminada);
        Fin;
        Si(Comparar(Cadena personalizada("your nickname <-------"), ==, Separación de cadena(Primero de(Jugador del evento), Matriz vacía)));
            Mensaje grande(Primero de(Verdadero), Cadena personalizada("Message to the whole room"));
            Crear texto dentro del mundo(Primero de(Verdadero), Cadena personalizada("display title"), Jugador del evento, 1.5, Atravesar las superficies, Visible para posición y cadena, Color(Naranja), Visibilidad predeterminada);
    }
}

deshabilitado regla ("Addon | Display Author Time - 展示世界纪录 <---- EDIT ME / 在此处编辑") {
    evento {
        En curso - Global;
    }
    acciones {
        "type your entry in the textfield that says \\"name and time here\\"\\n在文本框 中输入“名称和时间”"
        Crear texto del HUD(Primero de(Verdadero), Nulo, Cadena personalizada(" \\n{0} author time {0}", Cadena de ícono(Fuego)), Cadena personalizada("name and time here"), Derecha, -142, Nulo, Color(Rosa), Color(Rosa), Visible para, Visibilidad predeterminada);
        Modificar variable global(HudStoreEdit, Anexar a la matriz, ID de texto anterior);
    }
}

deshabilitado regla ("Addon | HUD text for certain Checkpoints - 特定关卡显示的HUD文本 <---- EDIT ME / 在此处编辑") {
    evento {
        En curso - Global;
    }
    acciones {
        "the example fill shows a text for cp 1 and cp 3\\n示例已填写 关卡1和3 的hud文本"
        Esperar(0.768, Ignorar condición);
        "in CpHudText fill in text\\n修改字符串 “CpHudText” 为顶部显示 的hud文本"
        Establecer variable global(CpHudText, Matriz(Cadena personalizada("text cp 1"), Cadena personalizada("text cp 3")));
        "in CpHudCp fill in the at wich to display\\n修改数组 “CpHudCp” 为hud文本 显示的关卡"
        Establecer variable global(CpHudCp, Matriz(1, 3));
    }
}

deshabilitado regla ("Addon | Inworld text for certain Checkpoints - 特定关卡显示的地图文本 <---- EDIT ME / 在此处编辑") {
    evento {
        En curso - Global;
    }
    acciones {
        "the example fill shows a text for cp 1 and cp 3\\n示例已填写 关卡1和3 的地图文本"
        Esperar(0.768, Ignorar condición);
        "in CpIwtText fill in text\\n修改字符串 “CpIwtText” 为关卡显示 的地图文本"
        Establecer variable global(CpIwtText, Matriz(Cadena personalizada("text cp 1"), Cadena personalizada("text cp 3")));
        "in CpIwtCp fill in cp at wich to display\\n修改数组 “CpIwtCp” 为显示地图 文本的关卡"
        Establecer variable global(CpIwtCp, Matriz(1, 3));
        "in CpIwtPos fill in the vector\\n修改数组 “CpIwtPos” 为地图文本 的矢量位置"
        Establecer variable global(CpIwtPos, Matriz(Vector(Verdadero, Verdadero, Verdadero), Vector(Verdadero, Verdadero, Verdadero)));
        "color applies to all\\n选择应用到 所有地图文 本的颜色"
        Establecer variable global(CpIwtColor, Color(Verde lima));
    }
}

deshabilitado regla ("Addon | Hint text for certain Checkpoints - 特定关卡的提示文本 <---- EDIT ME / 在此处编辑") {
    evento {
        En curso - Global;
    }
    acciones {
        "the example fill shows a text for cp 1 and cp 3\\n示例已填写 关卡1和3 的提示文本"
        Esperar(0.768, Ignorar condición);
        "in HintText fill in text\\n修改字符串 “HintText” 为关卡显示 的提示文本"
        Establecer variable global(HintText, Matriz(Cadena personalizada("text cp 1"), Cadena personalizada("text cp 3")));
        "in HintCp fill in the at wich to display\\n修改数组 “HintCp” 为提示文本 显示的关卡"
        Establecer variable global(HintCp, Matriz(1, 3));
    }
}

deshabilitado regla ("Addon | 3rd Person Camera Mode - 第三人称") {
    evento {
        El jugador se unió a la partida;
        Todos;
        Todos;
    }
    acciones {
        "Default 1st person: False\\nDefault 3rd person: True"
        Establecer variable de jugador(Jugador del evento, addon_toggle3rdPov, Verdadero);
        Llamada a subrutina(Addon3rdPerson);
    }
}

regla ("<tx0C00000000001344> Addons Skills - 附加组件技能 <tx0C00000000001344>") {
    evento {
        En curso - Global;
    }
}

deshabilitado regla ("Addon | Stall enhancer - 增强系統跳的判定") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Ha aparecido(Jugador del evento) == Verdadero;
        Velocidad vertical de(Jugador del evento) >= -0.2;
        Velocidad vertical de(Jugador del evento) <= 0.05;
        Velocidad horizontal de(Jugador del evento) <= 1.3;
        En el aire(Jugador del evento) == Verdadero;
        (Jugador del evento).editor_on != Falso;
        (Jugador del evento).editor_fly == Falso;
    }
    acciones {
        "@Condition createWorkshopSetting(bool, \\"map settings \\\\n地图设置\\",\\" Autobounce enhancer - 增强系統跳的判定\\", false, 3)"
        Esperar(0.25, Cancelar cuando es falso);
        Comenzar a forzar la posición del jugador(Jugador del evento, Posición de(Jugador del evento), Falso);
        Esperar hasta(No(En movimiento(Jugador del evento)), 1);
        Dejar de forzar la posición del jugador(Jugador del evento);
        Establecer velocidad de movimiento(Jugador del evento, Falso);
        Establecer gravedad(Jugador del evento, Falso);
        "double jump catch"
        Esperar hasta(O(O(O(O(Botón presionado(Jugador del evento, Botón(Recargar)), (Jugador del evento).editor_fly), Está muerto(Jugador del evento)), Está utilizando la habilidad 1(Jugador del evento)), Comparar(Velocidad de(Jugador del evento), >, 3)), 3);
        "wait(3)"
        Establecer gravedad(Jugador del evento, 100);
        Establecer velocidad de movimiento(Jugador del evento, 100);
        Si(Y(Está vivo(Jugador del evento), No(O((Jugador del evento).editor_fly, Botón presionado(Jugador del evento, Botón(Recargar))))));
            Aplicar impulso(Jugador del evento, Arriba, 10, Al mundo, Cancelar movimiento contrario XYZ);
            Repetir si la condición es verdadera;
    }
}

deshabilitado regla ("Addon | Fake Ledge Dash - 超级跳") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        Está utilizando la habilidad 1(Jugador del evento) == Verdadero;
    }
    acciones {
        "climb / ledge > hold jump > hands on the ledge > dash  > wait for launch > release jump\\n爬墙/扒 > 长按跳 > 抓住窗台 > SHIFT > 等待发射 > 释放跳跃"
        Establecer variable de jugador según el índice(Jugador del evento, addon_ledgeDash, Falso, Nulo);
        Esperar hasta(Comparar(Velocidad de(Jugador del evento), >=, 45), 0.4);
        "stop storing, we keep this speed/direction"
        Mientras(Y(Está utilizando la habilidad 1(Jugador del evento), Comparar(Primero de((Jugador del evento).addon_ledgeDash), <, 12)));
            Omitir si(Comparar(Velocidad de(Jugador del evento), <, 45), 9);
            Modificar variable de jugador según el índice(Jugador del evento, addon_ledgeDash, Falso, Agregar, Verdadero);
            Establecer variable de jugador según el índice(Jugador del evento, addon_ledgeDash, Verdadero, Dirección de orientación de(Jugador del evento));
            Establecer variable de jugador según el índice(Jugador del evento, addon_ledgeDash, 2, Velocidad de(Jugador del evento));
            Esperar(Falso, Ignorar condición);
        Fin;
        "wait for dash to finish to execute"
        Esperar hasta(Comparar(Velocidad de(Jugador del evento), <, 40), 0.4);
        "and eventPlayer.addon_ledgeDash[0] <= 12: # ledge dash execute"
        Si(Comparar(Primero de((Jugador del evento).addon_ledgeDash), >=, 5));
            Aplicar impulso(Jugador del evento, Valor en la matriz((Jugador del evento).addon_ledgeDash, Verdadero), Último de((Jugador del evento).addon_ledgeDash), Al mundo, Cancelar movimiento contrario XYZ);
        Fin;
        //lbl_a:
        Establecer variable de jugador(Jugador del evento, addon_ledgeDash, Nulo);
    }
}

deshabilitado regla ("Addon | Group up - Map Data") {
    evento {
        En curso - Global;
    }
    acciones {
        "replace 777 with checkpoint number\\nreplace vector 0,0,0 with orb position"
        Crear texto dentro del mundo(Matriz filtrada(Todos los jugadores(Todos los equipos), Comparar((Elemento de matriz actual).checkpoint_current, ==, 777)), Cadena personalizada("{0} {1} {0}", Cadena de ícono de habilidad(Héroe(Genji), Botón(Habilidad máxima)), If-Then-Else(Comparar(Cadena("Uff"), ==, Cadena personalizada("噢")), Cadena personalizada("待在这里"), Cadena personalizada("group up"))), Vector(Verdadero, Verdadero, Verdadero), 1.5, No atravesar, Visible para y cadena, Color(Naranja), Visibilidad predeterminada);
        "replace 777 with checkpoint number\\nreplace vector 0,0,0 with orb position\\n3.5 is the radius"
        Crear efecto(Matriz filtrada(Todos los jugadores(Todos los equipos), Comparar((Elemento de matriz actual).checkpoint_current, ==, 777)), Esfera, Color(Naranja), Vector(Verdadero, Verdadero, Verdadero), 3.5, Visible para);
    }
}

deshabilitado regla ("Addon | Group Up") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "replace 777 with checkpoint number"
        (Jugador del evento).checkpoint_current == 777;
        Está vivo(Jugador del evento) == Verdadero;
        En el suelo(Jugador del evento) == Falso;
        (Jugador del evento).toggle_invincible == Falso;
        "replace vector 0,0,0 with orb position\\n3.5 is the radius"
        Distancia entre(Jugador del evento, Vector(Verdadero, Verdadero, Verdadero)) < 3.5;
    }
    acciones {
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   stay in the bubble"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   9"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   8"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   7"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   6"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   5"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   4"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   3"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   2"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Mensaje pequeño(Jugador del evento, Cadena personalizada("   1"));
        Esperar(Verdadero, Cancelar cuando es falso);
        Comenzar a forzar la posición del jugador(Jugador del evento, Agregar(Valor en la matriz(Global.A, Agregar((Jugador del evento).checkpoint_current, Verdadero)), Multiplicar(0.1, Arriba)), Falso);
        Establecer estado(Jugador del evento, Nulo, Arraigado, 0.3);
        Esperar(0.112, Ignorar condición);
        Dejar de forzar la posición del jugador(Jugador del evento);
    }
}

deshabilitado regla ("Addon | Custom checkpoint loading or resetting") {
    evento {
        Subrutina;
        AddonCustomLoadAndReset;
    }
    acciones {
        "This subroutine triggers on failing, arriving, resetting, skipping etc\\nexample: reset gravity and movespeed after being changed by custom orbs"
        Establecer gravedad(Jugador del evento, 100);
        Establecer velocidad de movimiento(Jugador del evento, 100);
    }
}

deshabilitado regla ("Addon | Custom Orb Script") {
    evento {
        En curso - Cada jugador;
        Todos;
        Todos;
    }
    condiciones {
        "don't edit this condition !!!!!!!!!!!!!!!!!"
        (Jugador del evento).cache_bounceTouched > -1;
    }
    acciones {
        "Enable this rule and find the ID number of the bounce orbs via the editor display.\\nNote that the ID can change if you place or delete orbs infront of that orb.\\nDo NOT edit the next 2 actions."
        Establecer variable de jugador(Jugador del evento, addon_bounceId, Primero de(Matriz filtrada(Matriz mapeada(Global.pinballnumber, Índice de matriz actual), Y(Comparar(Valor en la matriz(Global.pinballnumber, Elemento de matriz actual), ==, (Jugador del evento).checkpoint_current), Comparar(Valor en la matriz(Global.TQ, Elemento de matriz actual), ==, Valor en la matriz((Jugador del evento).cache_bouncePosition, (Jugador del evento).cache_bounceTouched))))));
        "Add the desired ID numbers for the bounces in the array\\nadd the script after it\\nyou can use the trigger sub above this rule to reset the effects"
        Si(Comparar((Jugador del evento).addon_bounceId, ==, 2));
            "example gravity (should be reset to 100 in trigger on fail)"
            Establecer gravedad(Jugador del evento, 25);
            Mensaje pequeño(Jugador del evento, Cadena personalizada(" you feel light"));
            Esperar(2, Ignorar condición);
            Establecer gravedad(Jugador del evento, 100);
        Fin;
        Si(La matriz contiene(Matriz(2, 3), (Jugador del evento).addon_bounceId));
            "example canceling primary makes double jump recover"
            Cancelar acción primaria(Jugador del evento);
            Establecer variable de jugador(Jugador del evento, skill_usedDouble, Nulo);
            Mensaje pequeño(Jugador del evento, Cadena personalizada(" double jump recovered"));
        Fin;
        Si(Comparar((Jugador del evento).addon_bounceId, ==, 4));
            "example move speed"
            Establecer velocidad de movimiento(Jugador del evento, 250);
            Mensaje pequeño(Jugador del evento, Cadena personalizada(" zooom"));
    }
}

deshabilitado regla ("Addon | Fake Triple Jump - 假三段跳") {
    evento {
        En curso - Cada jugador;
        Todos;
        Genji;
    }
    condiciones {
        "@Condition BanTriple == false"
        En el suelo(Jugador del evento) == Falso;
        "Double cannot be used already"
        (Jugador del evento).skill_usedDouble == Falso;
        "Don't trigger on reset"
        Botón presionado(Jugador del evento, Botón(Recargar)) == Falso;
    }
    acciones {
        "Enable checking double jump"
        Establecer variable de jugador(Jugador del evento, addon_enableDoubleChecks, Verdadero);
        Esperar(Falso, Ignorar condición);
        Repetir si la condición es verdadera;
        Abortar si(O((Jugador del evento).skill_usedDouble, Botón presionado(Jugador del evento, Botón(Recargar))));
        "Input window to Triple"
        Esperar hasta(Y(Está saltando(Jugador del evento), Botón presionado(Jugador del evento, Botón(Saltar))), 0.048);
        Si(Y(Botón presionado(Jugador del evento, Botón(Saltar)), Está saltando(Jugador del evento)));
            Aplicar impulso(Jugador del evento, Arriba, 9, Al mundo, Cancelar movimiento contrario XYZ);
        Si no;
            Repetir si la condición es verdadera;
    }
}


`;
