
document.getElementById("versiondisplayhere").innerHTML = "1.10.3E"


function setdata(){
    data_pasta = String.raw`
settings
{
	main
	{
		Description: "\n◀ The Official Genji Parkour Editor ▶\nCode: 54CRY\nAdapted by: LulledLion, FishoFire, Nebula\nv1.10.3E"
		Mode Name: "Genji Parkour - 源氏跑酷 - v1.10.3E"
	}

	lobby
	{
		Allow Players Who Are In Queue: Yes
		Max Spectators: 3
		Max Team 1 Players: 11
		Max Team 2 Players: 0
		Return To Lobby: Never
		Swap Teams After Match: No
	}

	modes
	{
		disabled Assault
		{
			Enable Perks: Off
		}

		disabled Bounty Hunter
		{
			Allow Hero Switching: Disabled
			Enemy Health Bars: Disabled
			Game Mode Start: Immediately
			Hero Limit: Off
			Kill Cam: Disabled
			Kill Feed: Disabled
			Respawn As Random Hero: Enabled
			Respawn Time Scalar: 0%
			Spawn Health Packs: Disabled
		}

		disabled Capture the Flag
		{
			Allow Hero Switching: Disabled
			Enemy Health Bars: Disabled
			Flag Dropped Lock Time: 5.0
			Flag Return Time: 4.0
			Flag Score Respawn Time: 15.0
			Game Mode Start: Immediately
			Hero Limit: Off
			Kill Cam: Disabled
			Kill Feed: Disabled
			Respawn As Random Hero: Enabled
			Respawn Time Scalar: 0%
			Spawn Health Packs: Disabled
		}

		disabled Clash
		{
			Capture Speed Modifier: 45%
			Enable Perks: Off
		}

		disabled Clash
		{
			Capture Speed Modifier: 45%
			Enable Perks: Off
		}

		disabled Control
		{
			Enable Perks: Off
		}

		disabled Control
		{
			Enable Perks: Off
		}

		disabled Elimination
		{
			Allow Hero Switching: Disabled
			Enemy Health Bars: Disabled
			Game Mode Start: Immediately
			Hero Limit: Off
			Kill Cam: Disabled
			Kill Feed: Disabled
			Respawn As Random Hero: Enabled
			Respawn Time Scalar: 0%
			Spawn Health Packs: Disabled
		}

		disabled Escort
		{
			Enable Perks: Off
		}

		disabled Escort
		{
			Enable Perks: Off
		}

		disabled Flashpoint
		{
			Enable Perks: Off
		}

		disabled Flashpoint
		{
			Enable Perks: Off
		}

		disabled Hybrid
		{
			Enable Perks: Off
		}

		disabled Hybrid
		{
			Enable Perks: Off
		}

		disabled Practice Range
		{
			Enable Perks: Off
		}

		disabled Practice Range
		{
			Allow Hero Switching: Disabled
			Enable Perks: Off
			Enemy Health Bars: Disabled
			Game Mode Start: Immediately
			Hero Limit: Off
			Kill Cam: Disabled
			Kill Feed: Disabled
			Respawn As Random Hero: Enabled
			Respawn Time Scalar: 0%
			Spawn Health Packs: Disabled
		}

		disabled Push
		{
			Enable Perks: Off
		}

		disabled Push
		{
			Enable Perks: Off
		}

		Skirmish
		{
			Allow Hero Switching: Disabled
			Enable Perks: Off
			Enemy Health Bars: Disabled
			Game Mode Start: Immediately
			Hero Limit: Off
			Kill Cam: Disabled
			Kill Feed: Disabled
			Respawn As Random Hero: Enabled
			Respawn Time Scalar: 0%
			Spawn Health Packs: Disabled

			enabled maps
			{
				Workshop Chamber 972777519512064577
			}
		}

		Team Deathmatch
		{
			Allow Hero Switching: Disabled
			Enable Perks: Off
			Enemy Health Bars: Disabled
			Game Mode Start: Immediately
			Hero Limit: Off
			Kill Cam: Disabled
			Kill Feed: Disabled
			Respawn As Random Hero: Enabled
			Respawn Time Scalar: 0%
			Self Initiated Respawn: Off
			Spawn Health Packs: Disabled

			enabled maps
			{
				Workshop Chamber 972777519512064577
			}
		}
	}

	heroes
	{
		General
		{
			Genji
			{
				Deflect: Disabled
				No Ammunition Requirement: On
				Swift Strike Cooldown Time: 1%
				Ultimate Duration: 25%
				Ultimate Generation - Passive Dragonblade: 0%
				Ultimate Generation Dragonblade: 10%
			}

			enabled heroes
			{
				Genji
			}
		}
	}

	extensions
	{
		Spawn More Dummy Bots
		Play More Effects
	}
}

variables
{
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
		32: LeaderBoardFull
		33: LeaderBoardHuds
		34: LeaderBoardRemake
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
		91: MapVectorArray

	player:
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
		18: skill_countJumps
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
		52: editor_saveHud
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

subroutines
{
	0: StartGame
	1: LeaderboardUpdate
	2: CheckpointFailReset
	3: UpdateTitle
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
	17: EffectsCreate
	18: RebuildKillOrbs
	19: RebuildPortals
	20: RebuildBounceOrbs
}

rule("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页    </fg>v1.10.3E")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"◀ The Official Genji Parkour Editor ▶\nDiscord: dsc.gg/genjiparkour\nCode: 54CRY\nAdapted by: LulledLion, FishoFire, Nebula"
		Abort;
	}
}

rule("<tx0C00000000001344> Editor <tx0C00000000001344>")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Editor | Clear Excess Data to Save Map")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Is Button Held(Event Player, Button(Melee)) == True;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Reload)) == True;
	}

	actions
	{
		"@Condition eventPlayer.editor_lock == false # !!! don't lock. always be sure data can be exported incase of a perma lock situation"
		Wait(True, Abort When False);
		"doesnt matter thats its in pasta's because it wil be fixed on spawning"
		Event Player.editor_lock = True;
		Event Player.editor_saveHud = Global.TimeRemaining;
		Global.TimeRemaining = Null;
		Global.C = Null;
		Global.K = Null;
		Global.NANBA = Null;
		Global.TQ2 = Null;
		Global.SaveName = Null;
		Global.SaveCp = Null;
		Global.SaveTimer = Null;
		Global.SaveEnt = Null;
		"SavePauseTime = null\nSavePauseEnabled = null"
		Global.SaveElapsed = Null;
		Global.ColorConfig = Null;
		Global.CompMode = Null;
		Global.LeaderBoardFull = Null;
		Global.LeaderBoardHuds = Null;
		Global.PortalOn = Null;
		Global.TitleData = Null;
		Global.CpHudText = Null;
		Global.CpHudCp = Null;
		Global.HintText = Null;
		Global.HintCp = Null;
		Global.CpIwtText = Null;
		Global.CpIwtCp = Null;
		Global.CpIwtPos = Null;
		Global.CpIwtColor = Null;
		Global.PortalNames = Null;
		Global.PortalLoc = Null;
		Global.PortalDest = Null;
		Global.PortalEffects = Null;
		If(Global.Name == Custom String("name here - 作者"));
			Global.Name = Custom String("{0}", Event Player);
		End;
		Global.Cachedcredits = Array(Global.Name, Global.Code);
		Global.Name = Null;
		Global.Code = Null;
		Start Rule(AddonCheckMap, Do Nothing);
		Create HUD Text(Event Player, Custom String("­"), Null, String("Oof") == Custom String("噢") ? Custom String(
			"   0. 清理无用数据:\n (此窗口打开时将自动完成)\n\n   1. 复制数据:\n Esc → 打开地图工坊查看器 → 右下角'变量目标'改为全局\n 点击窗口下方图标 (X) 复制作图数据\n\n   2. 录入数据:\n Esc → 打开地图工坊编辑器{0}",
			Custom String(
			" → 规则第(2/2)页 → 展开规则'数据录入 <---- 在这输入'\n 点击'动作'一栏右侧橙色粘贴图标 录入数据\n\n   3. 地图工坊设置:\n ESC → 显示大厅 → 设置 → 地图工坊设置→\n 拉至底部 关闭'作图模式'\n 选择地图难度\n{0}",
			Custom String(
			"\n   4. 创建初始地图代码:\n Esc → 显示大厅 → 设置 → 分享代码 →\n 创建新的代码 → 复制并记下代码\n\n   5. 添加作者信息:\n Esc → 打开地图工坊编辑器 → 规则第(2/2)页 → 展开规则'Credits here {0}",
			Custom String("- 作者名字'\n 修改自定义字符串文本框中的内容\n\n   6. 更新地图及作者信息:\n Esc → 显示大厅 → 设置 → 共享代码 →\n 上传至现有代码 → 粘贴步骤4中获得的代码"))))
			: Custom String(
			"   0. clear excess data:\n Already done when opening this window\n\n   1. Copy data:\n Open Workshop Inspector → Set variable tar{0}",
			Custom String(
			"get as global\n click the [x]\n\n   2. Insert data:\n Paste the data into rule named 'Map Data <---- INSERT HERE'\n\n   3. Workshop{0}",
			Custom String(
			" settings:\n ESC → SHOW LOBBY → SETTINGS → workshop settings →\n toggle 'Editor mode' off\n Select display difficulty\n\n   4. Cre{0}",
			Custom String(
			"ate initial sharecode:\n ESC → SHOW LOBBY → SETTINGS → SHARE CODE →\n CREATE NEW CODE → COPY CODE\n\n   5. Add credits:\n Enter yo{0}",
			Custom String(
			"ur name & map code in the 'Credits here' rule\n\n   6. Update for credits:\n ESC → SHOW LOBBY → SETTINGS → SHARE CODE →\n UPLOAD {0}",
			Custom String("TO EXISTING CODE → PASTE THE CODE YOU CREATED IN STEP 4")))))), Top, -185, Color(Lime Green), Color(Lime Green),
			Color(Lime Green), String, Default Visibility);
		Modify Player Variable(Event Player, editor_saveHud, Append To Array, Last Text ID);
		Create HUD Text(Event Player, String("Oof") == Custom String("噢") ? Custom String("    > 按互动键关闭当前窗口 <    ") : Custom String(
			"    > Press Interact to close this window <    "), Null, Null, Top, -183, Color(Lime Green), Null, Null, String,
			Default Visibility);
		Modify Player Variable(Event Player, editor_saveHud, Append To Array, Last Text ID);
		Enable Inspector Recording;
		Disable Inspector Recording;
		Wait Until(!Is Button Held(Event Player, Button(Interact)), 999999995904.000);
		Wait Until(Is Button Held(Event Player, Button(Interact)), 999999995904.000);
		Global.TimeRemaining = First Of(Event Player.editor_saveHud);
		Destroy HUD Text(Event Player.editor_saveHud[True]);
		Destroy HUD Text(Last Of(Event Player.editor_saveHud));
		Event Player.editor_saveHud = Null;
		Event Player.editor_lock = False;
	}
}

rule("Editor | Hud and Effects")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"cant be condition because host player can leaves, removing the rule fx"
		Wait Until(Entity Exists(Host Player), 999999995904.000);
		Wait(True, Ignore Condition);
		If(!Host Player.editor_on);
			"clear variables if not in editor mode"
			Global.HudStoreEdit = Null;
			Abort;
		End;
		Wait(2, Ignore Condition);
		"hostPlayer.editor_lock = true\nremove unnesesary huds"
		While(Count Of(Global.HudStoreEdit));
			Destroy HUD Text(First Of(Global.HudStoreEdit));
			Destroy In-World Text(First Of(Global.HudStoreEdit));
			Modify Global Variable(HudStoreEdit, Remove From Array By Index, False);
		End;
		Wait(False, Ignore Condition);
		"infinite time and attempts"
		If(Global.CompMode);
			Global.CompAtmpNum = Null;
			Global.CompTime = 999999995904.000;
			All Players(All Teams).comp_countAttempts = Null;
			All Players(All Teams).comp_done = False;
		End;
		"huds ==========================================================================================================================================================================\nrestart without leaderboard (old one deleted)"
		Create HUD Text(Local Player.toggle_guide, Null, Null, String("Oof") == Custom String("噢") ? Custom String("{0}+{1}+{2} | 重新开始",
			Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 2)), Input Binding String(Button(Interact)))
			: Custom String("{0}+{1}+{2} | Restart", Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 2)),
			Input Binding String(Button(Interact))), Right, -156, Null, Null, Global.ColorConfig[5], Visible To and String,
			Default Visibility);
		"hud 1"
		Create HUD Text(Host Player.toggle_guide ? Host Player : Null, Null, Null, String("Oof") == Custom String("噢") ? (
			Global.EditorMoveItem ? Custom String("方向键 | 移动实体 \n{0} | 向上移动 \n{1} | 向下移动 \n{2} (长按) | 快速移动", Input Binding String(Button(
			Ability 2)), Input Binding String(Button(Ultimate)), Input Binding String(Button(Jump))) : Array(Custom String(
			"{0} + {1} | 新建检查点\n{0} + {2} | 删除选中的检查点", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)),
			Input Binding String(Button(Secondary Fire))), Custom String("{0} + {1} | 新建击杀球\n{0} + {1} (长按) | 在准心位置新建",
			Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire))), Custom String(
			"{0} + {1} | 新建弹球\n{0} + {1} (长按) | 在准心位置新建", Input Binding String(Button(Interact)), Input Binding String(Button(
			Primary Fire))), Custom String("{0} + {1} | 蹭留\n{0} + {2} | 卡小", Input Binding String(Button(Interact)), Input Binding String(
			Button(Primary Fire)), Input Binding String(Button(Secondary Fire))), Custom String(
			"{0} + {1} | 新建传送门\n{0} + {1} (长按) | 在准心位置新建", Input Binding String(Button(Interact)), Input Binding String(Button(
			Primary Fire))))[Host Player.editor_modeSelect]) : (Global.EditorMoveItem ? Custom String(
			"walk | move selected\n{0} | move up\n{1} | move down\n{2} (hold) | move faster", Input Binding String(Button(Ability 2)),
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Jump))) : Array(Custom String(
			"{0} + {1} | Create New\n{0} + {2} | Delete selected", Input Binding String(Button(Interact)), Input Binding String(Button(
			Primary Fire)), Input Binding String(Button(Secondary Fire))), Custom String(
			"{0} + {1} | Create new\n{0} + {1} (hold)| raycast new", Input Binding String(Button(Interact)), Input Binding String(Button(
			Primary Fire))), Custom String("{0} + {1} | Create new\n{0} + {1} (hold)| raycast new", Input Binding String(Button(Interact)),
			Input Binding String(Button(Primary Fire))), Custom String("{0} + {1} | multiclimb\n{0} + {2} | createbhop",
			Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(
			Secondary Fire))), Custom String("{0} + {1} | create new\n{0} + {1} (hold)| raycast new", Input Binding String(Button(
			Interact)), Input Binding String(Button(Primary Fire))))[Host Player.editor_modeSelect]), Right, -148, Null, Null, Color(
			Yellow), Visible To and String, Default Visibility);
		"hud 1-5"
		Create HUD Text(Host Player.toggle_guide && !Global.EditorMoveItem ? Host Player : Null, Null, Null, String("Oof")
			== Custom String("噢") ? Array(Empty Array, Custom String("{0} + {1} | 删除选中的击杀球", Input Binding String(Button(Interact)),
			Input Binding String(Button(Secondary Fire))), Custom String("{0} + {1} | 删除选中的弹球", Input Binding String(Button(Interact)),
			Input Binding String(Button(Secondary Fire))), Empty Array, Custom String("{0} + {1} | 删除选中的传送门", Input Binding String(Button(
			Interact)), Input Binding String(Button(Secondary Fire))))[Host Player.editor_modeSelect] : Array(Empty Array, Custom String(
			"{0} + {1} | delete selected", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire))),
			Custom String("{0} + {1} | delete selected", Input Binding String(Button(Interact)), Input Binding String(Button(
			Secondary Fire))), Empty Array, Custom String("{0} + {1} | delete selected", Input Binding String(Button(Interact)),
			Input Binding String(Button(Secondary Fire))))[Host Player.editor_modeSelect], Right, -147, Null, Null, Color(Yellow),
			Visible To and String, Default Visibility);
		"hud 2"
		Create HUD Text(Host Player.toggle_guide ? Host Player : Null, Null, Null, String("Oof") == Custom String("噢") ? (
			Global.EditorMoveItem ? Custom String("{0} | 放置实体{1} | cancel placement\n", Input Binding String(Button(Primary Fire)),
			Input Binding String(Button(Secondary Fire))) : Array(Custom String("{0} + {1} | 移除/新建传送点\n{0} + {2} | 检查点碰撞模型\n",
			Input Binding String(Button(Interact)), Input Binding String(Button(Reload)), Input Binding String(Button(Ability 1))),
			Custom String("{0} + {1} | 选择上一个击杀球\n{0} + {2} | 选择下一个击杀球\n", Input Binding String(Button(Interact)), Input Binding String(
			Button(Crouch)), Input Binding String(Button(Jump))), Custom String("{0} + {1} | 选择上一个弹球\n{0} + {2} | 选择下一个弹球\n",
			Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Input Binding String(Button(Jump))),
			Custom String("{0} + {1} | 爬墙\n{0} + {2} | 延二段跳", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)),
			Input Binding String(Button(Jump))), Custom String("{0} + {1} | 选择下一个传送门\n{0} + {2} | 选择上一个传送门\n", Input Binding String(Button(
			Interact)), Input Binding String(Button(Jump)), Input Binding String(Button(Crouch))))[Host Player.editor_modeSelect]) : (
			Global.EditorMoveItem ? Custom String("{0} | confirm placement\n{1} | cancel placement", Input Binding String(Button(
			Primary Fire)), Input Binding String(Button(Secondary Fire))) : Array(Custom String(
			"{0} + {1} | Remove/Add teleport\n{0} + {2} | Toggle Hitbox\n", Input Binding String(Button(Interact)), Input Binding String(
			Button(Reload)), Input Binding String(Button(Ability 1))), Custom String(
			"{0} + {1} | Select previous\n{0} + {2} | Select next\n", Input Binding String(Button(Interact)), Input Binding String(Button(
			Crouch)), Input Binding String(Button(Jump))), Custom String("{0} + {1} | Select previous\n{0} + {2} | Select next\n",
			Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Input Binding String(Button(Jump))),
			Custom String("{0} + {1} | wallclimb\n{0} + {2} | save double", Input Binding String(Button(Interact)), Input Binding String(
			Button(Crouch)), Input Binding String(Button(Jump))), Custom String("{0} + {1} | select next\n{0} + {2} | select previous\n",
			Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Input Binding String(Button(Crouch))))
			[Host Player.editor_modeSelect]), Right, -146, Null, Null, Color(Yellow), Visible To and String, Default Visibility);
		"hud3"
		Create HUD Text(Host Player.toggle_guide && !Global.EditorMoveItem ? Host Player : Null, Null, Null, String("Oof")
			== Custom String("噢") ? Array(Custom String("{0} (长按) | 移动检查点", Input Binding String(Button(Ability 2))), Custom String(
			"{0} + {1} | 增大击杀球\n{0} + {2} | 缩小击杀球", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)),
			Input Binding String(Button(Crouch))), Custom String("{0} + {1} | 增加弹球弹力\n{0} + {2} | 减少弹球弹力", Input Binding String(Button(
			Ability 2)), Input Binding String(Button(Jump)), Input Binding String(Button(Crouch))), Custom String(
			"{0} + {1} | 死小\n{0} + {2} | 表情留小", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)),
			Input Binding String(Button(Secondary Fire))), Custom String("{0} + {1} | 移动选中的实体\n{0} + {2} | 应用到当前/所有关卡(开关)",
			Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(Jump))))
			[Host Player.editor_modeSelect] : Array(Custom String("{0} (hold) | Move", Input Binding String(Button(Ability 2))),
			Custom String("{0} + {1} | Increase size\n{0} + {2} | Decrease size", Input Binding String(Button(Ability 2)),
			Input Binding String(Button(Jump)), Input Binding String(Button(Crouch))), Custom String(
			"{0} + {1} | Increase strength\n{0} + {2} | Decrease strength", Input Binding String(Button(Ability 2)), Input Binding String(
			Button(Jump)), Input Binding String(Button(Crouch))), Custom String("{0} + {1} | death hop\n{0} + {2} | emote",
			Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(
			Secondary Fire))), Custom String("{0} + {1} | move\n{0} + {2} | cp/map (toggle)", Input Binding String(Button(Ability 2)),
			Input Binding String(Button(Primary Fire)), Input Binding String(Button(Jump))))[Host Player.editor_modeSelect], Right, -145,
			Null, Null, Color(Yellow), Visible To and String, Default Visibility);
		"hud4"
		Create HUD Text(Host Player.toggle_guide && !Global.EditorMoveItem ? Host Player : Null, Null, Null, String("Oof")
			== Custom String("噢") ? Array(Empty Array, Custom String("{0} + {1} | 移动选中的实体", Input Binding String(Button(Ability 2)),
			Input Binding String(Button(Primary Fire))), Custom String("{0} + {1} | 移动选中的实体", Input Binding String(Button(Ability 2)),
			Input Binding String(Button(Primary Fire))), Custom String("{0} + {1} | 留小跳进点\n{0} + {2} | 站卡", Input Binding String(Button(
			Ability 2)), Input Binding String(Button(Jump)), Input Binding String(Button(Crouch))), Empty Array)
			[Host Player.editor_modeSelect] : Array(Empty Array, Custom String("{0} + {1} | Move", Input Binding String(Button(Ability 2)),
			Input Binding String(Button(Primary Fire))), Custom String("{0} + {1} | Move", Input Binding String(Button(Ability 2)),
			Input Binding String(Button(Primary Fire))), Custom String("{0} + {1} | require bhop\n{0} + {2} | stand create",
			Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Input Binding String(Button(Crouch))),
			Empty Array)[Host Player.editor_modeSelect], Right, -144, Null, Null, Color(Yellow), Visible To and String,
			Default Visibility);
		"=="
		Create HUD Text(Host Player.toggle_guide ? Host Player : Null, Null, Null, String("Oof") == Custom String("噢") ? Custom String(
			" \n{0} + {1} | 下一关", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire))) : Custom String(
			" \n{0} + {1} | Next checkpoint", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire))), Right,
			-150, Null, Null, Host Player.toggle_guide ? Color(Green) : Color(Orange), Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.toggle_guide ? Host Player : Null, Null, Null, String("Oof") == Custom String("噢") ? Custom String(
			"{0} + {1} | 上一关\n{2} (长按) | 飞行\n", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)),
			Input Binding String(Button(Ability 1))) : Custom String("{0} + {1} | Prev checkpoint\n{2} (hold)| Fly\n",
			Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Ability 1))),
			Right, -149, Null, Null, Host Player.toggle_guide ? Color(Green) : Color(Orange), Visible To String and Color,
			Default Visibility);
		Create HUD Text(Host Player.toggle_guide ? Host Player : Null, Null, String("Oof") == Custom String("噢") ? Custom String(
			"保存地图长按 {0} + {1} + {2}", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)), Custom String(
			"{0} 后按弹出窗口的提示进行操作                                                                                                ",
			Input Binding String(Button(Reload)))) : Custom String("to save map, hold {0} + {1} + {2}", Input Binding String(Button(
			Interact)), Input Binding String(Button(Melee)), Custom String(
			"{0} then follow instructions                                                                                                ",
			Input Binding String(Button(Reload)))), Null, Left, -197, Null, Color(Yellow), Null, Visible To and String,
			Default Visibility);
		Create HUD Text(Local Player.editor_saveHud ? Null : Local Player, String("Oof") == Custom String("噢") ? (Is Button Held(
			Host Player, Button(Melee)) ? Custom String("{0} 检查点模式\n{1} 击杀球模式\n{2}", Host Player.editor_modeSelect ? Custom String("     ")
			: Icon String(Arrow: Right), Host Player.editor_modeSelect == 1 ? Icon String(Arrow: Right) : Custom String("     "),
			Custom String("{0} 弹球模式\n{1} 封禁(单关)\n{2} 自定义传送门 ", Host Player.editor_modeSelect == 2 ? Icon String(Arrow: Right)
			: Custom String("     "), Host Player.editor_modeSelect == 3 ? Icon String(Arrow: Right) : Custom String("     "),
			Host Player.editor_modeSelect == 4 ? Icon String(Arrow: Right) : Custom String("     "))) : (
			Local Player == Host Player ? Custom String(" {0} {1} ", Array(Icon String(Flag), Icon String(Skull), Icon String(Moon),
			Icon String(Stop), Icon String(Spiral))[Host Player.editor_modeSelect], Array(Custom String("检查点模式"), Custom String("击杀球模式"),
			Custom String("弹球模式"), Custom String("封禁(单关)"), Custom String("自定义传送门"))[Host Player.editor_modeSelect]) : Custom String(
			" {0} 源氏 编辑者 {0} ", Icon String(Bolt)))) : (Is Button Held(Host Player, Button(Melee)) ? Custom String(
			"{0} checkpoints\n{1} boundary spheres\n{2}", Host Player.editor_modeSelect ? Custom String("     ") : Icon String(
			Arrow: Right), Host Player.editor_modeSelect == 1 ? Icon String(Arrow: Right) : Custom String("     "), Custom String(
			"{0} function orbs\n{1} skill bans\n{2} portals", Host Player.editor_modeSelect == 2 ? Icon String(Arrow: Right)
			: Custom String("     "), Host Player.editor_modeSelect == 3 ? Icon String(Arrow: Right) : Custom String("     "),
			Host Player.editor_modeSelect == 4 ? Icon String(Arrow: Right) : Custom String("     "))) : (
			Local Player == Host Player ? Custom String(" {0} {1} ", Array(Icon String(Flag), Icon String(Skull), Icon String(Moon),
			Icon String(Stop), Icon String(Spiral))[Host Player.editor_modeSelect], Array(Custom String("checkpoints"), Custom String(
			"boundary sphere"), Custom String("function orbs"), Custom String("skill bans"), Custom String("portals"))
			[Host Player.editor_modeSelect]) : Custom String(" {0} Genji editor {0} ", Icon String(Bolt)))), Null, Null, Top, -174, Color(
			Blue), Color(Blue), Color(Blue), Visible To and String, Default Visibility);
		Create HUD Text(First Of(True), Null, String("Oof") == Custom String("噢") ? (Local Player == Host Player ? Custom String(
			"{0} + 射击 | 切换作图模式", Input Binding String(Button(Melee))) : Custom String("房主/编辑者 {0}", Host Player)) : (
			Local Player == Host Player ? Custom String("{0} + shoot | change mode", Input Binding String(Button(Melee))) : Custom String(
			"Current host/editor: {0}", Host Player)), Null, Top, -175, Color(Sky Blue), Local Player.editor_lock ? Color(Gray) : Color(
			White), Color(White), Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.toggle_guide && (!Host Player.editor_modeSelect || (Host Player.editor_modeSelect == 2 && Count Of(
			Host Player.editor_bounceIndex))) ? Host Player : Null, Null, Null, String("Oof") == Custom String("噢") ? Custom String(
			"{0} + {1} | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Primary Fire)), Custom String(
			"{0} {1} | {2}                                                                                                ",
			Host Player.editor_modeSelect ? Custom String("弹球给刀") : Custom String("检查点给刀"), Ability Icon String(Hero(Genji), Button(
			Ultimate)), Host Player.editor_modeSelect == 2 ? Global.TQ5[Global.EditSelected] : Array Contains(Global.Dao,
			Host Player.checkpoint_current))) : Custom String("{0} + {1} | {2}", Input Binding String(Button(Ultimate)),
			Input Binding String(Button(Primary Fire)), Custom String(
			"{0} give ult {1} | {2}                                                                                                ",
			Host Player.editor_modeSelect ? Custom String("Orb") : Custom String("Level"), Ability Icon String(Hero(Genji), Button(
			Ultimate)), Host Player.editor_modeSelect == 2 ? Global.TQ5[Global.EditSelected] : Array Contains(Global.Dao,
			Host Player.checkpoint_current))), Left, -189, Null, Null,
			Global.TQ5[Global.EditSelected] && Host Player.editor_modeSelect == 2 ? Color(Green) : (Array Contains(Global.Dao,
			Host Player.checkpoint_current) && !Host Player.editor_modeSelect ? Color(Green) : Color(Orange)), Visible To String and Color,
			Default Visibility);
		Create HUD Text(Host Player.toggle_guide && (!Host Player.editor_modeSelect || (Host Player.editor_modeSelect == 2 && Count Of(
			Host Player.editor_bounceIndex))) ? Host Player : Null, Null, Null, String("Oof") == Custom String("噢") ? Custom String(
			"{0} + {1} | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Secondary Fire)), Custom String(
			"{0} {1} | {2}                                                                                                ",
			Host Player.editor_modeSelect ? Custom String("弹球给Shift") : Custom String("检查点给Shift"), Ability Icon String(Hero(Genji),
			Button(Ability 1)), Host Player.editor_modeSelect == 2 ? Global.TQ6[Global.EditSelected] : Array Contains(Global.SHIFT,
			Host Player.checkpoint_current))) : Custom String("{0} + {1} | {2}", Input Binding String(Button(Ultimate)),
			Input Binding String(Button(Secondary Fire)), Custom String(
			"{0} give dash {1} | {2}                                                                                                ",
			Host Player.editor_modeSelect ? Custom String("Orb") : Custom String("Level"), Ability Icon String(Hero(Genji), Button(
			Ability 1)), Host Player.editor_modeSelect == 2 ? Global.TQ6[Global.EditSelected] : Array Contains(Global.SHIFT,
			Host Player.checkpoint_current))), Left, -188, Null, Null,
			Global.TQ6[Global.EditSelected] && Host Player.editor_modeSelect == 2 ? Color(Green) : (Array Contains(Global.SHIFT,
			Host Player.checkpoint_current) && !Host Player.editor_modeSelect ? Color(Green) : Color(Orange)), Visible To String and Color,
			Default Visibility);
		Create HUD Text(Host Player.editor_modeSelect == 2 && Host Player.toggle_guide && Count Of(Host Player.editor_bounceIndex)
			? Host Player : Null, Null, Null, String("Oof") == Custom String("噢") ? Custom String("{0} + {1} |  收集球(进点前必须集齐) {2}",
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 2)), Custom String(
			"{0} | {1}\n                                                                                                ", Icon String(
			Asterisk), Global.BounceToggleLock[Global.EditSelected])) : Custom String("{0} + {1} | unlocks checkpoint {2}",
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 2)), Custom String(
			"{0} | {1}\n                                                                                                ", Icon String(
			Asterisk), Global.BounceToggleLock[Global.EditSelected])), Left, -187, Null, Null,
			Global.BounceToggleLock[Global.EditSelected] ? Color(Green) : Color(Orange), Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.toggle_guide ? Host Player : Null, String("Oof") == Custom String("噢") ? Custom String(
			"球体/传送门上限: {0}/193 ", Count Of(Global.TQ) + Count Of(Global.H) + Count Of(Global.CustomPortalStart)) : Custom String(
			"orb/portal limit: {0}/193 ", Count Of(Global.TQ) + Count Of(Global.H) + Count Of(Global.CustomPortalStart)), Null,
			Custom String(
			"                                                                                                                                "),
			Left, -191, Color(Blue), Null, Null, Visible To and String, Default Visibility);
		"display selected cc/orb info"
		Create HUD Text(Host Player.toggle_guide ? Host Player : Null, String("Oof") == Custom String("噢") ? (
			!Host Player.editor_modeSelect && Count Of(Global.A) ? Custom String("\n 选中的检查点 \n 矢量: {0}{1} \n",
			Global.A[Host Player.checkpoint_current], Count Of(Global.A[Host Player.checkpoint_current]) < 2 ? Empty Array : Custom String(
			"\n 传送点: {0}", Global.A[Host Player.checkpoint_current][True])) : (Host Player.editor_modeSelect == 1 && Count Of(
			Host Player.editor_killIndex) ? Custom String("\n 选中的击杀球\n 矢量: {0}\n 半径: {1}\n  + 進不去\n  - 出不來\n",
			Global.H[Global.EditSelected], Global.I[Global.EditSelected]) : (Host Player.editor_modeSelect == 2 && Count Of(
			Host Player.editor_bounceIndex) ? Custom String("\n 选中的弹球\n 矢量: {0}\n 弹力: {1}\n 序号: {2}\n", Global.TQ[Global.EditSelected],
			Global.EditMode[Global.EditSelected], Global.EditSelected) : (Host Player.editor_modeSelect == 3 ? Custom String(
			"\n 封禁(单关)\n――――――――――――\n {0} 蹭留 ∞\n {1} 卡小 ♂\n {2}", Array Contains(Global.BanMulti, Host Player.checkpoint_current)
			? Custom String("√") : Empty Array, Array Contains(Global.BanCreate, Host Player.checkpoint_current) ? Custom String("√")
			: Empty Array, Custom String("{0} 站卡 ♠\n {1} 爬墙 ↑\n {2}", Array Contains(Global.BanStand, Host Player.checkpoint_current)
			? Custom String("√") : Empty Array, Array Contains(Global.BanClimb, Host Player.checkpoint_current) ? Custom String("√")
			: Empty Array, Custom String("{0} 死小 X\n {1} 表情留小 ♥\n {2}", Array Contains(Global.BanDead, Host Player.checkpoint_current)
			? Custom String("√") : Empty Array, Array Contains(Global.BanEmote, Host Player.checkpoint_current) ? Custom String("√")
			: Empty Array, Custom String("{0} 延二段跳 △\n――――――――――――\n {1} 留小跳进点 ≥\n", Array Contains(Global.BanSaveDouble,
			Host Player.checkpoint_current) ? Custom String("√") : Empty Array, Array Contains(Global.BanBhop,
			Host Player.checkpoint_current) ? Custom String("√") : Empty Array)))) : (Host Player.editor_modeSelect == 4 && Array Contains(
			Array(Host Player.checkpoint_current, -1), Global.CustomPortalCP[Global.EditSelected]) && Count Of(Global.CustomPortalCP)
			? Custom String("\n 入口矢量: {0}\n 出口矢量: {1}\n 应用关卡: {2}\n", Global.CustomPortalStart[Global.EditSelected],
			Global.CustomPortalEndpoint[Global.EditSelected], Global.CustomPortalCP[Global.EditSelected] < Null ? Custom String("所有")
			: Host Player.checkpoint_current) : Custom String("\n   当前无数据选中   \n")))))) : (!Host Player.editor_modeSelect && Count Of(
			Global.A) ? Custom String("\n Selected Checkpoint\n Vector: {0}{1} \n", Global.A[Host Player.checkpoint_current], Count Of(
			Global.A[Host Player.checkpoint_current]) < 2 ? Empty Array : Custom String("\n Teleport: {0}",
			Global.A[Host Player.checkpoint_current][True])) : (Host Player.editor_modeSelect == 1 && Count Of(
			Host Player.editor_killIndex) ? Custom String(
			"\n Selected boundary sphere\n Vector: {0}\n radius: {1}\n  + keep out\n  - stay in\n", Global.H[Global.EditSelected],
			Global.I[Global.EditSelected]) : (Host Player.editor_modeSelect == 2 && Count Of(Host Player.editor_bounceIndex)
			? Custom String("\n Selected Bounce Orb\n Vector: {0}\n strength: {1} \n ID: {2}\n", Global.TQ[Global.EditSelected],
			Global.EditMode[Global.EditSelected], Global.EditSelected) : (Host Player.editor_modeSelect == 3 ? Custom String(
			"\n skill bans\n――――――――――――\n {0} multi-climb ∞\n {1} create ♂\n {2}", Array Contains(Global.BanMulti,
			Host Player.checkpoint_current) ? Custom String("√") : Empty Array, Array Contains(Global.BanCreate,
			Host Player.checkpoint_current) ? Custom String("√") : Empty Array, Custom String("{0} stand ♠\n {1} climb ↑\n {2}",
			Array Contains(Global.BanStand, Host Player.checkpoint_current) ? Custom String("√") : Empty Array, Array Contains(
			Global.BanClimb, Host Player.checkpoint_current) ? Custom String("√") : Empty Array, Custom String(
			"{0} dead X\n {1} emote ♥\n {2}", Array Contains(Global.BanDead, Host Player.checkpoint_current) ? Custom String("√")
			: Empty Array, Array Contains(Global.BanEmote, Host Player.checkpoint_current) ? Custom String("√") : Empty Array,
			Custom String("{0} save double △\n――――――――――――\n {1} require bhop ≥\n", Array Contains(Global.BanSaveDouble,
			Host Player.checkpoint_current) ? Custom String("√") : Empty Array, Array Contains(Global.BanBhop,
			Host Player.checkpoint_current) ? Custom String("√") : Empty Array)))) : (Host Player.editor_modeSelect == 4 && Array Contains(
			Array(Host Player.checkpoint_current, -1), Global.CustomPortalCP[Global.EditSelected]) && Count Of(Global.CustomPortalCP)
			? Custom String("\n Start: {0} \n End: {1} \n CP: {2} \n", Global.CustomPortalStart[Global.EditSelected],
			Global.CustomPortalEndpoint[Global.EditSelected], Global.CustomPortalCP[Global.EditSelected] < Null ? Custom String("All")
			: Host Player.checkpoint_current) : Custom String("\n   No data selected   \n")))))), Null, Custom String(
			"                                                                                                                                "),
			Left, -190, Color(White), Color(Orange), Color(Orange), Visible To and String, Default Visibility);
		Wait(True, Ignore Condition);
		"effects =========================================================================================================================================================================="
		Create In-World Text(Count Of(Global.EditSelectIdArray) ? Local Player : Null, String("Oof") == Custom String("噢") ? Custom String(
			"选中的实体") : Custom String("selected"), Host Player.editor_modeSelect == 1 ? Global.H[Global.EditSelected] : (
			Host Player.editor_modeSelect == 2 ? Global.TQ[Global.EditSelected] : (
			Host Player.editor_modeSelect == 4 ? Global.CustomPortalStart[Global.EditSelected] : Null)), 1.200, Do Not Clip,
			Visible To Position and String, Color(Orange), Default Visibility);
		Create Icon(Count Of(Global.EditSelectIdArray) ? Local Player : Null,
			Host Player.editor_modeSelect == 1 ? Global.H[Global.EditSelected] : (
			Host Player.editor_modeSelect == 2 ? Global.TQ[Global.EditSelected] : (
			Host Player.editor_modeSelect == 4 ? Global.CustomPortalStart[Global.EditSelected] : Null)), Arrow: Down,
			Visible To and Position, Color(White), True);
		"Purple sphere for teleport location"
		Create Effect(Count Of(Global.A[Host Player.checkpoint_current]) > 1 && !Host Player.editor_modeSelect ? Local Player : Null,
			Sphere, Color(Purple), Global.A[Host Player.checkpoint_current][True] - Vector(False, 0.100, False), 0.200,
			Visible To Position and Radius);
		"Teleport text"
		Create In-World Text(Count Of(Global.A[Host Player.checkpoint_current])
			> 1 && !Host Player.editor_modeSelect ? Local Player : Null, String("Oof") == Custom String("噢") ? Custom String("传送点位置")
			: Custom String("teleporter location"), Global.A[Host Player.checkpoint_current][True], 1.600, Do Not Clip,
			Visible To Position and String, Color(Sky Blue), Default Visibility);
		"normal cp if teleport"
		Create Effect(Global.A[Host Player.checkpoint_current][True] && !Host Player.editor_modeSelect ? Host Player : Null, Ring, Color(
			Orange), First Of(Global.A[Host Player.checkpoint_current]), True, Visible To Position and Radius);
		Create In-World Text(Global.A[Host Player.checkpoint_current][True] && !Host Player.editor_modeSelect ? Host Player : Null, String(
			"Oof") == Custom String("噢") ? Custom String("检查点位置") : Custom String("level location"), First Of(
			Global.A[Host Player.checkpoint_current]), 1.600, Do Not Clip, Visible To Position and String, Color(Sky Blue),
			Default Visibility);
		"portal fx"
		Create Effect(Count Of(Global.EditSelectIdArray) && Host Player.editor_modeSelect == 4 ? Host Player : Null, Sparkles, Color(
			Purple), Global.CustomPortalEndpoint[Global.EditSelected], 0.200, Visible To Position and Radius);
	}
}

rule("Editor |  Fly/Noclip Toggle")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Is Button Held(Event Player, Button(Ability 1)) == True;
		Event Player.editor_fly == Null;
		Global.EditorMoveItem == False;
	}

	actions
	{
		Wait Until(Is Button Held(Event Player, Button(Reload)) || !Is Button Held(Event Player, Button(Ability 1)), 0.700);
		If(Is Button Held(Event Player, Button(Reload)) || !Is Button Held(Event Player, Button(Ability 1)));
			Wait(False, Ignore Condition);
			Abort;
		End;
		Event Player.editor_fly = Position Of(Event Player) + Up;
		Start Forcing Player Position(Event Player, Event Player.editor_fly, True);
		Disable Movement Collision With Environment(Event Player, True);
		Disallow Button(Event Player, Button(Ultimate));
		Wait Until(!Is Button Held(Event Player, Button(Ability 1)), True);
		While(Is Alive(Event Player) && Event Player.editor_fly && !Is Button Held(Event Player, Button(Ability 1)));
			If(!(Event Player == Host Player && Global.EditorMoveItem));
				Event Player.editor_fly += (0.096 + 0.192 * Is Button Held(Event Player, Button(Jump)) - 0.048 * Is Button Held(Event Player,
					Button(Crouch))) * (Facing Direction Of(Event Player) * Z Component Of(Throttle Of(Event Player)) * Vector(True,
					!Is Button Held(Event Player, Button(Ability 1)), True) + World Vector Of(Throttle Of(Event Player) * Left, Event Player,
					Rotation) + Up * (Is Button Held(Event Player, Button(Ability 2)) - Is Button Held(Event Player, Button(Ultimate))));
			End;
			Wait(False, Ignore Condition);
		End;
		Allow Button(Event Player, Button(Ultimate));
		Enable Movement Collision With Environment(Event Player);
		Event Player.editor_fly = Null;
		Stop Forcing Player Position(Event Player);
		Wait(True, Ignore Condition);
	}
}

rule("Editor | change mode")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Is Button Held(Event Player, Button(Melee)) == True;
		Is Button Held(Event Player, Button(Primary Fire)) != Is Button Held(Event Player, Button(Secondary Fire));
		Event Player.editor_lock == False;
	}

	actions
	{
		Event Player.editor_lock = True;
		If(Is Button Held(Event Player, Button(Primary Fire)));
			Event Player.editor_modeSelect += 4;
		Else;
			Event Player.editor_modeSelect += True;
		End;
		Event Player.editor_modeSelect %= 5;
		Call Subroutine(EditUpdateSelectedIds);
		Call Subroutine(EditorSelectLast);
		Wait(False, Ignore Condition);
		Wait Until(Is Button Held(Event Player, Button(Primary Fire)) == Is Button Held(Event Player, Button(Secondary Fire)), 0.100);
		Event Player.editor_lock = False;
	}
}

rule("Editor | update selected id")
{
	event
	{
		Subroutine;
		EditUpdateSelectedIds;
	}

	actions
	{
		If(Host Player.editor_modeSelect == 1);
			Global.EditSelectIdArray = Mapped Array(Global.killballnumber, Current Array Index);
			Global.EditSelectIdArray = Filtered Array(Global.EditSelectIdArray,
				Global.killballnumber[Current Array Element] == Host Player.checkpoint_current);
		Else If(Host Player.editor_modeSelect == 2);
			Global.EditSelectIdArray = Mapped Array(Global.pinballnumber, Current Array Index);
			Global.EditSelectIdArray = Filtered Array(Global.EditSelectIdArray,
				Global.pinballnumber[Current Array Element] == Host Player.checkpoint_current);
		Else If(Host Player.editor_modeSelect == 4);
			Global.EditSelectIdArray = Mapped Array(Global.CustomPortalCP, Current Array Index);
			Global.EditSelectIdArray = Filtered Array(Global.EditSelectIdArray,
				Global.CustomPortalCP[Current Array Element] < Null || Global.CustomPortalCP[Current Array Element] == Host Player.checkpoint_current);
		Else;
			Global.EditSelectIdArray = Empty Array;
		End;
	}
}

rule("Editor | select last")
{
	event
	{
		Subroutine;
		EditorSelectLast;
	}

	actions
	{
		Global.EditSelected = Last Of(Global.EditSelectIdArray);
	}
}

rule("Editor | create cp/orb")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.editor_on != False;
		Event Player == Host Player;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Primary Fire)) == True;
		Event Player.editor_lock == False;
		Array Contains(Array(Null, 1, 2, 4), Host Player.editor_modeSelect) == True;
	}

	actions
	{
		Event Player.editor_lock = True;
		If(!Host Player.editor_modeSelect);
			If(Count Of(Global.A) && Distance Between(Event Player, Global.A[Host Player.checkpoint_current]) <= 1.400);
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   放置的检查点距离太近") : Custom String(
					"   Cannot place checkpoint too close."));
				Skip(86);
			End;
			If(Event Player.checkpoint_current >= Count Of(Global.A) - True);
				Event Player.checkpoint_current = Count Of(Global.A) - True;
			End;
			If(Host Player.checkpoint_current == Count Of(Global.A) - True);
				Modify Global Variable(A, Append To Array, Position Of(Event Player));
				Event Player.checkpoint_current += True;
				Call Subroutine(UpdateCache);
			Else;
				Modify Global Variable(A, Append To Array, Position Of(Event Player));
				Global.A = Mapped Array(Global.A, Current Array Index < Host Player.checkpoint_current + True ? Current Array Element : (
					Current Array Index == Host Player.checkpoint_current + True ? Last Of(Global.A) : Global.A[Current Array Index - True]));
				Host Player.checkpoint_current += True;
				Global.killballnumber = Mapped Array(Global.killballnumber, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.pinballnumber = Mapped Array(Global.pinballnumber, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.CustomPortalCP = Mapped Array(Global.CustomPortalCP, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.Dao = Mapped Array(Global.Dao, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.SHIFT = Mapped Array(Global.SHIFT, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.BanMulti = Mapped Array(Global.BanMulti, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.BanCreate = Mapped Array(Global.BanCreate, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.BanStand = Mapped Array(Global.BanStand, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.BanDead = Mapped Array(Global.BanDead, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.BanEmote = Mapped Array(Global.BanEmote, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.BanClimb = Mapped Array(Global.BanClimb, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.BanSaveDouble = Mapped Array(Global.BanSaveDouble, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.BanBhop = Mapped Array(Global.BanBhop, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
				Global.BanDjump = Mapped Array(Global.BanDjump, Current Array Element + (
					Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			End;
			Small Message(Local Player, String("Oof") == Custom String("噢") ? Custom String("   新检查点已创建") : Custom String(
				"   New checkpoint created"));
		Else If(!Count Of(Global.A));
			Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   请先放置检查点") : Custom String(
				"   You first have to make a checkpoint"));
			Skip(55);
		Else If(Count Of(Global.TQ) + Count Of(Global.H) + Count Of(Global.CustomPortalStart) >= 193);
			Big Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("当前地图弹球/传送门数量已达上限") : Custom String(
				"Orb/portal limit reached for this map"));
			Skip(52);
		Else If(Host Player.editor_modeSelect == 1);
			Modify Global Variable(H, Append To Array, Position Of(Event Player));
			Modify Global Variable(killballnumber, Append To Array, Event Player.checkpoint_current);
			Modify Global Variable(I, Append To Array, 5);
			"to create the fx properly"
			Call Subroutine(EditUpdateSelectedIds);
			Call Subroutine(EditorSelectLast);
			Create Effect(Filtered Array(All Players(All Teams),
				Current Array Element.checkpoint_current == Global.killballnumber[Evaluate Once(Global.EditSelected)]), Sphere,
				Global.ColorConfig[14], Global.H[Evaluate Once(Global.EditSelected)], Absolute Value(Global.I[Evaluate Once(
				Global.EditSelected)]), Visible To Position and Radius);
			Modify Global Variable(K, Append To Array, Last Created Entity);
			Big Message(First Of(True), Custom String("{0} {1}", String("Oof") == Custom String("噢") ? Custom String("新击杀球已创建! \n仅生效于检查点")
				: Custom String("New boundary sphere has been created! \nOnly valid for this checkpoint"), Event Player.checkpoint_current));
			Wait Until(!(Is Button Held(Event Player, Button(Interact)) && Is Button Held(Event Player, Button(Primary Fire))), True);
			"EditUpdateSelectedIds() # to arrow during the placement properly"
			While(Is Button Held(Event Player, Button(Interact)) && Is Button Held(Event Player, Button(Primary Fire)));
				Global.H[Global.EditSelected] = Ray Cast Hit Position(Eye Position(Event Player), Eye Position(Event Player) + Facing Direction Of(
					Event Player) * 8, Null, Null, False);
				Wait(False, Ignore Condition);
			End;
		Else If(Host Player.editor_modeSelect == 2);
			Modify Global Variable(TQ, Append To Array, Position Of(Event Player));
			Modify Global Variable(pinballnumber, Append To Array, Event Player.checkpoint_current);
			Modify Global Variable(EditMode, Append To Array, 10);
			Modify Global Variable(TQ5, Append To Array, False);
			Modify Global Variable(TQ6, Append To Array, False);
			Modify Global Variable(BounceToggleLock, Append To Array, False);
			Call Subroutine(EditUpdateSelectedIds);
			Call Subroutine(EditorSelectLast);
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.checkpoint_current == Global.pinballnumber[Evaluate Once(Global.EditSelected)] && !Array Contains(
				Current Array Element.cache_collectedLocks, Evaluate Once(Global.EditSelected))), Orb, Global.BounceToggleLock[Evaluate Once(
				Global.EditSelected)] ? Global.ColorConfig[16] : Global.ColorConfig[15], Global.TQ[Evaluate Once(Global.EditSelected)], True,
				Visible To Position Radius and Color);
			Modify Global Variable(TQ2, Append To Array, Last Created Entity);
			Big Message(First Of(True), Custom String("{0} {1}", String("Oof") == Custom String("噢") ? Custom String("新弹球已创建! \n仅生效于检查点")
				: Custom String("New Bounce Orb has been created! \nOnly valid for this checkpoint"), Event Player.checkpoint_current));
			Wait Until(!(Is Button Held(Event Player, Button(Interact)) && Is Button Held(Event Player, Button(Primary Fire))), True);
			While(Is Button Held(Event Player, Button(Interact)) && Is Button Held(Event Player, Button(Primary Fire)));
				Global.TQ[Global.EditSelected] = Ray Cast Hit Position(Eye Position(Event Player), Eye Position(Event Player)
					+ Facing Direction Of(Event Player) * 7, Null, Null, False);
				Wait(False, Ignore Condition);
			End;
		Else If(Host Player.editor_modeSelect == 4);
			Modify Global Variable(CustomPortalStart, Append To Array, Position Of(Event Player));
			Modify Global Variable(CustomPortalEndpoint, Append To Array, Position Of(Event Player) + 10 * Up);
			Modify Global Variable(CustomPortalCP, Append To Array, Event Player.checkpoint_current);
			Call Subroutine(EditUpdateSelectedIds);
			Call Subroutine(EditorSelectLast);
			Create Effect(Filtered Array(All Players(All Teams), Global.CustomPortalCP[Evaluate Once(Global.EditSelected)
				] == Current Array Element.checkpoint_current || Global.CustomPortalCP[Evaluate Once(Global.EditSelected)] < Null), Good Aura,
				Global.ColorConfig[17], Global.CustomPortalStart[Evaluate Once(Global.EditSelected)], 0.600,
				Visible To Position Radius and Color);
			Modify Global Variable(PortalEffects, Append To Array, Last Created Entity);
			Global.EditSelected = Count Of(Global.CustomPortalStart) - True;
			Wait Until(!(Is Button Held(Event Player, Button(Interact)) && Is Button Held(Event Player, Button(Primary Fire))), True);
			"EditUpdateSelectedIds()"
			While(Is Button Held(Event Player, Button(Interact)) && Is Button Held(Event Player, Button(Primary Fire)));
				Global.CustomPortalStart[Global.EditSelected] = Ray Cast Hit Position(Eye Position(Event Player), Eye Position(Event Player)
					+ Facing Direction Of(Event Player) * 6, Null, Null, False);
				Wait(False, Ignore Condition);
			End;
			Big Message(First Of(True), String("Oof") == Custom String("噢") ? Custom String("新传送门已创建!\n生效于当前检查点") : Custom String(
				"Portal created \nOnly valid for this checkpoint"));
			Global.EditorMoveItem = True;
			Abort;
		Else;
			Skip(2);
		End;
		Call Subroutine(UpdateCache);
		Event Player.editor_lock = False;
		Wait(0.640, Ignore Condition);
	}
}

rule("Editor | delete cp/orb/portal")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Secondary Fire)) == True;
		Event Player == Host Player;
		"@Condition EditorMoveItem == false\n@Condition len(EditSelectIdArray) > 0"
		Event Player.editor_lock == False;
	}

	actions
	{
		Event Player.editor_lock = True;
		If(!Host Player.editor_modeSelect && Count Of(Global.A));
			"Resync Kill Orbs =================="
			Event Player.editor_temp = Filtered Array(Mapped Array(Global.killballnumber,
				Current Array Element == Host Player.checkpoint_current ? Current Array Index : -1), Current Array Element >= Null);
			"eventPlayer.editor_temp = [i for e, i in KillballCheckpoints if e == hostPlayer.checkpoint_current]"
			For Global Variable(NANBA, 0, Count Of(Event Player.editor_temp), True);
				Destroy Effect(Global.K[Event Player.editor_temp[Global.NANBA]]);
				Modify Global Variable(K, Remove From Array By Index, Event Player.editor_temp[Global.NANBA]);
				Wait(False, Ignore Condition);
			End;
			Modify Global Variable(killballnumber, Remove From Array By Value, Host Player.checkpoint_current);
			"Decrement checkpoints after removed one"
			Global.killballnumber = Mapped Array(Global.killballnumber, Current Array Element - (
				Current Array Element > Host Player.checkpoint_current ? 1 : Null));
			"Remove Radii at Checkpoint indexes (temp)"
			Global.I = Filtered Array(Global.I, !Array Contains(Event Player.editor_temp, Current Array Index));
			Global.H = Filtered Array(Global.H, !Array Contains(Event Player.editor_temp, Current Array Index));
			"Resync Bounce Orbs =============="
			Event Player.editor_temp = Filtered Array(Mapped Array(Global.pinballnumber,
				Current Array Element == Host Player.checkpoint_current ? Current Array Index : -1), Current Array Element >= Null);
			"eventPlayer.editor_temp = [i for e, i in BouncePadCheckpoints if e == hostPlayer.checkpoint_current]"
			For Global Variable(NANBA, 0, Count Of(Event Player.editor_temp), True);
				Destroy Effect(Global.TQ2[Event Player.editor_temp[Global.NANBA]]);
				Modify Global Variable(TQ2, Remove From Array By Index, Event Player.editor_temp[Global.NANBA]);
				Wait(False, Ignore Condition);
			End;
			Modify Global Variable(pinballnumber, Remove From Array By Value, Host Player.checkpoint_current);
			"Decrement checkpoints after removed one"
			Global.pinballnumber = Mapped Array(Global.pinballnumber, Current Array Element - (
				Current Array Element > Host Player.checkpoint_current ? 1 : Null));
			Global.TQ = Filtered Array(Global.TQ, !Array Contains(Event Player.editor_temp, Current Array Index));
			Global.EditMode = Filtered Array(Global.EditMode, !Array Contains(Event Player.editor_temp, Current Array Index));
			Global.TQ5 = Filtered Array(Global.TQ5, !Array Contains(Event Player.editor_temp, Current Array Index));
			Global.TQ6 = Filtered Array(Global.TQ6, !Array Contains(Event Player.editor_temp, Current Array Index));
			Global.BounceToggleLock = Filtered Array(Global.BounceToggleLock, !Array Contains(Event Player.editor_temp, Current Array Index));
			"Resync custom portals =================="
			Event Player.editor_temp = Filtered Array(Mapped Array(Global.CustomPortalCP,
				Current Array Element == Host Player.checkpoint_current ? Current Array Index : -1), Current Array Element >= Null);
			For Global Variable(NANBA, 0, Count Of(Event Player.editor_temp), True);
				Destroy Effect(Global.PortalEffects[Event Player.editor_temp[Global.NANBA]]);
				Modify Global Variable(PortalEffects, Remove From Array By Index, Event Player.editor_temp[Global.NANBA]);
				Wait(False, Ignore Condition);
			End;
			Modify Global Variable(CustomPortalCP, Remove From Array By Value, Host Player.checkpoint_current);
			"Decrement checkpoints after removed one"
			Global.CustomPortalCP = Mapped Array(Global.CustomPortalCP, Current Array Element - (
				Current Array Element > Host Player.checkpoint_current ? 1 : Null));
			"Remove Radii at Checkpoint indexes (temp)"
			Global.CustomPortalStart = Filtered Array(Global.CustomPortalStart, !Array Contains(Event Player.editor_temp,
				Current Array Index));
			Global.CustomPortalEndpoint = Filtered Array(Global.CustomPortalEndpoint, !Array Contains(Event Player.editor_temp,
				Current Array Index));
			Event Player.editor_temp = Null;
			Modify Global Variable(Dao, Remove From Array By Value, Host Player.checkpoint_current);
			Global.Dao = Mapped Array(Global.Dao, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(SHIFT, Remove From Array By Value, Host Player.checkpoint_current);
			Global.SHIFT = Mapped Array(Global.SHIFT, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(BanMulti, Remove From Array By Value, Host Player.checkpoint_current);
			Global.BanMulti = Mapped Array(Global.BanMulti, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(BanCreate, Remove From Array By Value, Host Player.checkpoint_current);
			Global.BanCreate = Mapped Array(Global.BanCreate, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(BanStand, Remove From Array By Value, Host Player.checkpoint_current);
			Global.BanStand = Mapped Array(Global.BanStand, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(BanDead, Remove From Array By Value, Host Player.checkpoint_current);
			Global.BanDead = Mapped Array(Global.BanDead, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(BanEmote, Remove From Array By Value, Host Player.checkpoint_current);
			Global.BanEmote = Mapped Array(Global.BanEmote, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(BanClimb, Remove From Array By Value, Host Player.checkpoint_current);
			Global.BanClimb = Mapped Array(Global.BanClimb, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(BanSaveDouble, Remove From Array By Value, Host Player.checkpoint_current);
			Global.BanSaveDouble = Mapped Array(Global.BanSaveDouble, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(BanBhop, Remove From Array By Value, Host Player.checkpoint_current);
			Global.BanBhop = Mapped Array(Global.BanBhop, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(BanDjump, Remove From Array By Value, Host Player.checkpoint_current);
			Global.BanDjump = Mapped Array(Global.BanDjump, Current Array Element - (
				Current Array Element >= Host Player.checkpoint_current ? 1 : Null));
			Modify Global Variable(A, Remove From Array By Index, Host Player.checkpoint_current);
			Modify Global Variable(C, Remove From Array By Index, Host Player.checkpoint_current);
			If(Host Player.checkpoint_current < 1);
				Host Player.checkpoint_current = Null;
			Else;
				Host Player.checkpoint_current -= True;
			End;
			Call Subroutine(RebuildKillOrbs);
			Call Subroutine(RebuildBounceOrbs);
			Call Subroutine(RebuildPortals);
			Small Message(Local Player, String("Oof") == Custom String("噢") ? Custom String("   检查点已删除") : Custom String(
				"   Checkpoint has been deleted"));
		Else If(Host Player.editor_modeSelect == 1 && Count Of(Global.EditSelectIdArray));
			Modify Global Variable(H, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(I, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(killballnumber, Remove From Array By Index, Global.EditSelected);
			Destroy Effect(Global.K[Global.EditSelected]);
			Modify Global Variable(K, Remove From Array By Index, Global.EditSelected);
			Call Subroutine(RebuildKillOrbs);
		Else If(Host Player.editor_modeSelect == 2 && Count Of(Global.EditSelectIdArray));
			Modify Global Variable(TQ, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(EditMode, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(TQ5, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(TQ6, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(BounceToggleLock, Remove From Array By Index, Global.EditSelected);
			Destroy Effect(Global.TQ2[Global.EditSelected]);
			Modify Global Variable(TQ2, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(pinballnumber, Remove From Array By Index, Global.EditSelected);
			Call Subroutine(RebuildBounceOrbs);
		Else If(Host Player.editor_modeSelect == 4 && Count Of(Global.EditSelectIdArray));
			Destroy Effect(Global.PortalEffects[Global.EditSelected]);
			Wait(False, Ignore Condition);
			Modify Global Variable(CustomPortalStart, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(CustomPortalEndpoint, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(CustomPortalCP, Remove From Array By Index, Global.EditSelected);
			Modify Global Variable(PortalEffects, Remove From Array By Index, Global.EditSelected);
			Call Subroutine(RebuildPortals);
		Else;
			Event Player.editor_lock = False;
			Wait(False, Ignore Condition);
			Abort;
		End;
		Call Subroutine(UpdateCache);
		Call Subroutine(EditorSelectLast);
		Event Player.editor_lock = False;
		Wait(0.160 + Entity Count * 0.007, Ignore Condition);
	}
}

rule("Editor | toggle orb functions")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Host Player.editor_modeSelect == 2;
		Is Button Held(Event Player, Button(Ultimate)) == True;
		(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire)) || Is Button Held(
			Event Player, Button(Ability 2))) == True;
		Count Of(Global.EditSelectIdArray) > Null;
		Event Player.editor_lock == False;
	}

	actions
	{
		Event Player.editor_lock = True;
		If(Is Button Held(Event Player, Button(Primary Fire)));
			Global.TQ5[Global.EditSelected] = !Global.TQ5[Global.EditSelected];
		Else If(Is Button Held(Event Player, Button(Secondary Fire)));
			Global.TQ6[Global.EditSelected] = !Global.TQ6[Global.EditSelected];
		Else;
			Global.BounceToggleLock[Global.EditSelected] = !Global.BounceToggleLock[Global.EditSelected];
			Global.EditMode[Global.EditSelected] = Global.BounceToggleLock[Global.EditSelected] ? Null : 10;
		End;
		Call Subroutine(UpdateCache);
		Event Player.editor_lock = False;
		Wait(False, Ignore Condition);
	}
}

rule("Editor | orb radi/strength")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Array Contains(Array(1, 2), Host Player.editor_modeSelect) == True;
		Count Of(Global.EditSelectIdArray) > Null;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Is Button Held(Event Player, Button(Jump)) != Is Button Held(Event Player, Button(Crouch));
		Is Button Held(Event Player, Button(Interact)) == False;
		Event Player.editor_lock == False;
	}

	actions
	{
		Event Player.editor_lock = True;
		While(Is Button Held(Event Player, Button(Ability 2)) && (Is Button Held(Event Player, Button(Jump)) || Is Button Held(
			Event Player, Button(Crouch))));
			If(Host Player.editor_modeSelect == 2 && Count Of(Event Player.editor_bounceIndex));
				Global.EditMode[Global.EditSelected] += Is Button Held(Event Player, Button(Jump)) ? 0.100 : -0.100;
			Else If(Host Player.editor_modeSelect == 1 && Count Of(Event Player.editor_killIndex));
				Global.I[Global.EditSelected] += Is Button Held(Event Player, Button(Jump)) ? 0.100 : -0.100;
			End;
			Wait(0.100, Ignore Condition);
		End;
		Call Subroutine(UpdateCache);
		Event Player.editor_lock = False;
	}
}

rule("Editor | select orb/portal")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Array Contains(Array(1, 2, 4), Host Player.editor_modeSelect) == True;
		Count Of(Global.EditSelectIdArray) > Null;
		Is Button Held(Event Player, Button(Interact)) == True;
		(Is Button Held(Event Player, Button(Crouch)) || Is Button Held(Event Player, Button(Jump))) == True;
		"@Condition EditorMoveItem == false"
		Event Player.editor_lock == False;
	}

	actions
	{
		Event Player.editor_lock = True;
		If(Is Button Held(Event Player, Button(Crouch)));
			Global.EditSelected = Index Of Array Value(Global.EditSelectIdArray, Global.EditSelected) == Null ? Last Of(
				Global.EditSelectIdArray) : Global.EditSelectIdArray[Index Of Array Value(Global.EditSelectIdArray, Global.EditSelected)
				- True];
		Else;
			Global.EditSelected = Index Of Array Value(Global.EditSelectIdArray, Global.EditSelected) == Count Of(Global.EditSelectIdArray)
				- True ? First Of(Global.EditSelectIdArray) : Global.EditSelectIdArray[Index Of Array Value(Global.EditSelectIdArray,
				Global.EditSelected) + True];
		End;
		Wait(False, Ignore Condition);
		Event Player.editor_lock = False;
		Wait Until(!Is Button Held(Event Player, Button(Interact)) || !(Is Button Held(Event Player, Button(Crouch)) || Is Button Held(
			Event Player, Button(Jump))), 0.240);
	}
}

rule("Editor | cp size hitbox display")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Host Player.editor_modeSelect == Null;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Ability 1)) == True;
	}

	actions
	{
		Event Player.editor_hitboxToggle = !Event Player.editor_hitboxToggle;
		Wait(False, Ignore Condition);
	}
}

rule("Editor | cp add/remove teleport")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Host Player.editor_on != False;
		Is Button Held(Host Player, Button(Interact)) == True;
		Is Button Held(Host Player, Button(Reload)) == True;
		Is Button Held(Host Player, Button(Melee)) == False;
		Count Of(Global.A) > True;
		Host Player.editor_modeSelect == Null;
		Host Player.editor_lock == False;
	}

	actions
	{
		"prevent overlap with save map"
		Wait Until(Is Button Held(Host Player, Button(Melee)) || !(Is Button Held(Host Player, Button(Interact)) && Is Button Held(
			Host Player, Button(Reload))), True);
		Abort If(Is Button Held(Host Player, Button(Melee)) || (Is Button Held(Host Player, Button(Interact)) && Is Button Held(
			Host Player, Button(Reload))));
		Host Player.editor_lock = True;
		If(!Host Player.checkpoint_current);
			Small Message(Host Player, String("Oof") == Custom String("噢") ? Custom String("   不能在第一个检查点设置传送门") : Custom String(
				"   Can't place a teleport on first checkpoint"));
			Host Player.editor_lock = False;
			Abort;
		End;
		"remove"
		If(Count Of(Global.A[Host Player.checkpoint_current]) > 1);
			Global.A[Host Player.checkpoint_current] = First Of(Global.A[Host Player.checkpoint_current]);
			Small Message(Host Player, String("Oof") == Custom String("噢") ? Custom String("   关卡{0}的传送点已移除", Host Player.checkpoint_current)
				: Custom String("   Teleport for level {0} has been removed", Host Player.checkpoint_current));
		"add"
		Else;
			Global.A[Host Player.checkpoint_current] = Array(Count Of(Global.A[Host Player.checkpoint_current]) ? First Of(
				Global.A[Host Player.checkpoint_current]) : Global.A[Host Player.checkpoint_current], Position Of(Host Player));
			Small Message(Host Player, Custom String("{0} {1}", String("Oof") == Custom String("噢") ? Custom String("   传送点已添加到当前关卡")
				: Custom String("   Teleport has been added for level"), Host Player.checkpoint_current));
		End;
		Host Player.editor_lock = False;
		Wait(False, Ignore Condition);
	}
}

rule("Editor | moving checkpoint")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.editor_on != False;
		Event Player == Host Player;
		Host Player.editor_modeSelect == Null;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Is Button Held(Event Player, Button(Secondary Fire)) == False;
		Count Of(Global.A) > Null;
		Event Player.editor_lock == False;
	}

	actions
	{
		Wait(0.300, Abort When False);
		If(Event Player.addon_toggle3rdPov);
			Event Player.addon_toggle3rdPov = False;
		End;
		Event Player.editor_lock = True;
		Event Player.editor_undo = Global.A[Event Player.checkpoint_current];
		Start Camera(Event Player, Eye Position(Event Player) + 0.500 * Up - 2.500 * Facing Direction Of(Event Player), Eye Position(
			Event Player), 15);
		While(Is Button Held(Event Player, Button(Ability 2)) && Is Alive(Event Player) && !Is Button Held(Event Player, Button(
			Secondary Fire)));
			If(Is Button Held(Event Player, Button(Primary Fire)));
				Set Move Speed(Event Player, 100);
			Else;
				Set Move Speed(Event Player, 3);
			End;
			If(Count Of(Global.A[Event Player.checkpoint_current]));
				Global.A[Event Player.checkpoint_current] = Array(Position Of(Event Player), Global.A[Event Player.checkpoint_current][True]);
			Else;
				Global.A[Event Player.checkpoint_current] = Position Of(Event Player);
			End;
			Wait(False, Ignore Condition);
		End;
		Stop Camera(Event Player);
		Set Move Speed(Event Player, 100);
		If(Is Button Held(Event Player, Button(Secondary Fire)));
			Global.A[Event Player.checkpoint_current] = Event Player.editor_undo;
			Wait Until(!Is Button Held(Event Player, Button(Ability 2)), 999999995904.000);
		End;
		Event Player.editor_lock = False;
	}
}

rule("Editor | add ult/dash")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Host Player.editor_modeSelect == Null;
		Count Of(Global.A) > Null;
		Is Button Held(Event Player, Button(Primary Fire)) != Is Button Held(Event Player, Button(Secondary Fire));
		Is Button Held(Event Player, Button(Ultimate)) == True;
		Event Player.editor_lock == False;
	}

	actions
	{
		If(Is Button Held(Event Player, Button(Primary Fire)));
			If(Array Contains(Global.Dao, Event Player.checkpoint_current));
				Modify Global Variable(Dao, Remove From Array By Value, Event Player.checkpoint_current);
			Else;
				Modify Global Variable(Dao, Append To Array, Event Player.checkpoint_current);
			End;
		Else;
			If(Array Contains(Global.SHIFT, Event Player.checkpoint_current));
				Modify Global Variable(SHIFT, Remove From Array By Value, Event Player.checkpoint_current);
			Else;
				Modify Global Variable(SHIFT, Append To Array, Event Player.checkpoint_current);
			End;
		End;
		Wait(False, Ignore Condition);
	}
}

rule("Editor | toggle bans")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Host Player.editor_modeSelect == 3;
		Count Of(Global.A) > Null;
		(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire)) || Is Button Held(
			Event Player, Button(Jump)) || Is Button Held(Event Player, Button(Crouch))) == True;
		(Is Button Held(Event Player, Button(Interact)) || Is Button Held(Event Player, Button(Ability 2))) == True;
		Event Player.editor_lock == False;
	}

	actions
	{
		Event Player.editor_lock = True;
		If(Is Button Held(Event Player, Button(Interact)));
			If(Is Button Held(Event Player, Button(Primary Fire)));
				If(Array Contains(Global.BanMulti, Event Player.checkpoint_current));
					Modify Global Variable(BanMulti, Remove From Array By Value, Event Player.checkpoint_current);
				Else;
					Modify Global Variable(BanMulti, Append To Array, Event Player.checkpoint_current);
				End;
			Else If(Is Button Held(Event Player, Button(Secondary Fire)));
				If(Array Contains(Global.BanCreate, Event Player.checkpoint_current));
					Modify Global Variable(BanCreate, Remove From Array By Value, Event Player.checkpoint_current);
				Else;
					Modify Global Variable(BanCreate, Append To Array, Event Player.checkpoint_current);
				End;
			Else If(Is Button Held(Event Player, Button(Crouch)));
				If(Array Contains(Global.BanClimb, Event Player.checkpoint_current));
					Modify Global Variable(BanClimb, Remove From Array By Value, Event Player.checkpoint_current);
				Else;
					Modify Global Variable(BanClimb, Append To Array, Event Player.checkpoint_current);
				End;
			Else;
				If(Array Contains(Global.BanSaveDouble, Event Player.checkpoint_current));
					Modify Global Variable(BanSaveDouble, Remove From Array By Value, Event Player.checkpoint_current);
				Else;
					Modify Global Variable(BanSaveDouble, Append To Array, Event Player.checkpoint_current);
				End;
			End;
		Else;
			If(Is Button Held(Event Player, Button(Primary Fire)));
				If(Array Contains(Global.BanDead, Event Player.checkpoint_current));
					Modify Global Variable(BanDead, Remove From Array By Value, Event Player.checkpoint_current);
				Else;
					Modify Global Variable(BanDead, Append To Array, Event Player.checkpoint_current);
				End;
			Else If(Is Button Held(Event Player, Button(Secondary Fire)));
				If(Array Contains(Global.BanEmote, Event Player.checkpoint_current));
					Modify Global Variable(BanEmote, Remove From Array By Value, Event Player.checkpoint_current);
				Else;
					Modify Global Variable(BanEmote, Append To Array, Event Player.checkpoint_current);
				End;
			Else If(Is Button Held(Event Player, Button(Crouch)));
				If(Array Contains(Global.BanStand, Event Player.checkpoint_current));
					Modify Global Variable(BanStand, Remove From Array By Value, Event Player.checkpoint_current);
				Else;
					Modify Global Variable(BanStand, Append To Array, Event Player.checkpoint_current);
				End;
			Else;
				If(Array Contains(Global.BanBhop, Event Player.checkpoint_current));
					Modify Global Variable(BanBhop, Remove From Array By Value, Event Player.checkpoint_current);
				Else;
					Modify Global Variable(BanBhop, Append To Array, Event Player.checkpoint_current);
				End;
			End;
		End;
		"BanStand"
		Wait(0.300, Ignore Condition);
		Call Subroutine(UpdateCache);
		Event Player.editor_lock = False;
	}
}

rule("Editor | portal cp change")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Host Player.editor_modeSelect == 4;
		Is Button Held(Event Player, Button(Jump)) == True;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Count Of(Global.EditSelectIdArray) > Null;
		"@Condition EditorMoveItem == false"
		Event Player.editor_lock == False;
	}

	actions
	{
		Global.CustomPortalCP[Global.EditSelected] = Global.CustomPortalCP[Global.EditSelected] < Null ? Event Player.checkpoint_current : -1;
		Wait(0.300, Ignore Condition);
	}
}

rule("Editor | move object")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.editor_on != False;
		Event Player == Host Player;
		Array Contains(Array(1, 2, 4), Host Player.editor_modeSelect) == True;
		Is Button Held(Event Player, Button(Secondary Fire)) == False;
		(Global.EditorMoveItem || (Is Button Held(Event Player, Button(Primary Fire)) && Is Button Held(Event Player, Button(Ability 2))
			&& Event Player.editor_lock == False)) == True;
		Count Of(Global.EditSelectIdArray) > Null;
	}

	actions
	{
		Event Player.editor_lock = True;
		Global.EditorMoveItem = True;
		If(Event Player.addon_toggle3rdPov);
			Event Player.addon_toggle3rdPov = False;
		End;
		Event Player.editor_fly = Null;
		Wait Until(!(Is Button Held(Event Player, Button(Primary Fire)) && Is Button Held(Event Player, Button(Ability 2))), True);
		"eventPlayer.disallowButton(Button.ULTIMATE)\neventPlayer.disallowButton(Button.JUMP)"
		Set Status(Event Player, Null, Hacked, 999999995904.000);
		Start Forcing Player Position(Event Player, Position Of(Event Player), False);
		If(Host Player.editor_modeSelect == 1);
			Event Player.editor_undo = Global.H[Global.EditSelected];
			Start Camera(Event Player, Global.H[Global.EditSelected] + Facing Direction Of(Event Player) * Absolute Value(
				Global.I[Global.EditSelected]) * -1.500, Global.H[Global.EditSelected], 30);
			While(!(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire))));
				Global.H[Global.EditSelected] += (0.096 + 0.192 * Is Button Held(Event Player, Button(Jump)) - 0.048 * Is Button Held(Event Player,
					Button(Crouch))) * (Facing Direction Of(Event Player) * Z Component Of(Throttle Of(Event Player)) * Vector(True,
					!Is Button Held(Event Player, Button(Ability 1)), True) + World Vector Of(Throttle Of(Event Player) * Left, Event Player,
					Rotation) + Up * (Is Button Held(Event Player, Button(Ability 2)) - Is Button Held(Event Player, Button(Ultimate))));
				Wait(False, Ignore Condition);
			End;
		Else If(Host Player.editor_modeSelect == 2);
			Event Player.editor_undo = Global.TQ[Global.EditSelected];
			Start Camera(Event Player, Global.TQ[Global.EditSelected] + Facing Direction Of(Event Player) * -4, Global.TQ[Global.EditSelected],
				30);
			While(!(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire))));
				Global.TQ[Global.EditSelected] += (0.096 + 0.192 * Is Button Held(Event Player, Button(Jump)) - 0.048 * Is Button Held(
					Event Player, Button(Crouch))) * (Facing Direction Of(Event Player) * Z Component Of(Throttle Of(Event Player)) * Vector(True,
					!Is Button Held(Event Player, Button(Ability 1)), True) + World Vector Of(Throttle Of(Event Player) * Left, Event Player,
					Rotation) + Up * (Is Button Held(Event Player, Button(Ability 2)) - Is Button Held(Event Player, Button(Ultimate))));
				Wait(False, Ignore Condition);
			End;
		Else If(Host Player.editor_modeSelect == 4);
			Event Player.editor_undo = Array(Global.CustomPortalStart[Global.EditSelected], Global.CustomPortalEndpoint[Global.EditSelected]);
			"move start position"
			Start Camera(Event Player, Global.CustomPortalStart[Global.EditSelected] + Facing Direction Of(Event Player) * -4,
				Global.CustomPortalStart[Global.EditSelected], 30);
			While(!(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire))));
				Global.CustomPortalStart[Global.EditSelected] += (0.096 + 0.192 * Is Button Held(Event Player, Button(Jump))
					- 0.048 * Is Button Held(Event Player, Button(Crouch))) * (Facing Direction Of(Event Player) * Z Component Of(Throttle Of(
					Event Player)) * Vector(True, !Is Button Held(Event Player, Button(Ability 1)), True) + World Vector Of(Throttle Of(
					Event Player) * Left, Event Player, Rotation) + Up * (Is Button Held(Event Player, Button(Ability 2)) - Is Button Held(
					Event Player, Button(Ultimate))));
				Wait(False, Ignore Condition);
			End;
			"move destination"
			Start Camera(Event Player, Global.CustomPortalEndpoint[Global.EditSelected] + Facing Direction Of(Event Player) * -4,
				Global.CustomPortalEndpoint[Global.EditSelected], 30);
			Wait Until(!Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire)), True);
			While(!(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire))));
				Global.CustomPortalEndpoint[Global.EditSelected] += (0.096 + 0.192 * Is Button Held(Event Player, Button(Jump))
					- 0.048 * Is Button Held(Event Player, Button(Crouch))) * (Facing Direction Of(Event Player) * Z Component Of(Throttle Of(
					Event Player)) * Vector(True, !Is Button Held(Event Player, Button(Ability 1)), True) + World Vector Of(Throttle Of(
					Event Player) * Left, Event Player, Rotation) + Up * (Is Button Held(Event Player, Button(Ability 2)) - Is Button Held(
					Event Player, Button(Ultimate))));
				Wait(False, Ignore Condition);
			End;
		End;
		If(Is Button Held(Event Player, Button(Secondary Fire)));
			Skip(2 * Host Player.editor_modeSelect);
		Else;
		Else;
			Global.H[Global.EditSelected] = Event Player.editor_undo;
		Else;
			Global.TQ[Global.EditSelected] = Event Player.editor_undo;
		Else;
		Else;
		Else;
			Global.CustomPortalStart[Global.EditSelected] = First Of(Event Player.editor_undo);
			Global.CustomPortalEndpoint[Global.EditSelected] = Last Of(Event Player.editor_undo);
		End;
		Event Player.editor_undo = Null;
		"eventPlayer.allowButton(Button.ULTIMATE)\neventPlayer.allowButton(Button.JUMP)"
		Clear Status(Event Player, Hacked);
		Stop Camera(Event Player);
		Stop Forcing Player Position(Event Player);
		Global.EditorMoveItem = Null;
		Call Subroutine(UpdateCache);
		Wait Until(!Is Button Held(Event Player, Button(Primary Fire)), True);
		Event Player.editor_lock = False;
	}
}

rule("<tx0C00000000001344> Commands <tx0C00000000001344>")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Command | Toggle Leaderboard (Hold Melee)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Count Of(Global.LeaderBoardFull) > Null;
		Event Player.editor_on == False;
		Is Button Held(Event Player, Button(Melee)) == True;
	}

	actions
	{
		Wait(True, Abort When False);
		Event Player.toggle_leaderboard = !Event Player.toggle_leaderboard;
	}
}

rule("Command | Split hide (Hold Dash + Primary + Secondary)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Ability 1)) == True;
		Is Button Held(Event Player, Button(Primary Fire)) == True;
		Is Button Held(Event Player, Button(Secondary Fire)) == True;
	}

	actions
	{
		Wait(True, Abort When False);
		"smallMessage(eventPlayer, \"   split display off\" if eventPlayer.timer_splitDisplay != -Math.INFINITY else \"   split display on\")"
		Event Player.timer_splitDisplay = Event Player.timer_splitDisplay == -999999995904.000 ? Null : -999999995904.000;
		Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
		Small Message(Event Player, Event Player.timer_splitDisplay == -999999995904.000 ? Custom String("   split display off")
			: Custom String("   split display on"));
		Wait(0.320, Ignore Condition);
	}
}

rule("Command | Toggle Invisible (Hold Deflect)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Event Player.editor_on == False;
		Global.CompMode == False;
	}

	actions
	{
		Wait(True, Abort When False);
		Event Player.toggle_invisible = !Event Player.toggle_invisible;
		Set Invisible(Event Player, None);
		If(Event Player.toggle_invisible);
			Set Invisible(Event Player, All);
		End;
		Small Message(Event Player, Custom String("   {0} {1}", String("Oof") == Custom String("噢") ? Custom String("隐身模式")
			: Custom String("Invisible"), Event Player.toggle_invisible ? Custom String("on") : Custom String("off")));
		Play Effect(Event Player, Debuff Impact Sound, Null, Event Player, 100);
	}
}

rule("Command | Preview Orbs & Portals (Hold Primary + Secondary)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.editor_on == False;
		Event Player.lockState == False;
		Event Player.checkpoint_notLast != False;
		Is Button Held(Event Player, Button(Primary Fire)) == True;
		Is Button Held(Event Player, Button(Secondary Fire)) == True;
	}

	actions
	{
		"wait(0.9, Wait.ABORT_WHEN_FALSE)"
		Wait(0.450, Abort When False);
		Event Player.preview_array1 = First Of(Global.A[Event Player.checkpoint_current + True]);
		If(Count Of(Global.pinballnumber));
			Modify Player Variable(Event Player, preview_array1, Append To Array, Filtered Array(Global.TQ,
				Global.pinballnumber[Current Array Index] == Event Player.checkpoint_current));
			Modify Player Variable(Event Player, preview_array2, Append To Array, Filtered Array(Mapped Array(Global.pinballnumber,
				Current Array Index), Global.pinballnumber[Current Array Element] == Event Player.checkpoint_current));
		End;
		If(Count Of(Global.CustomPortalStart));
			"eventPlayer.preview_array1.append( [i for i in CustomPortalStart if CustomPortalCP[CustomPortalStart.index(i)] == eventPlayer.checkpoint_current] )"
			For Player Variable(Event Player, preview_i, 0, Count Of(Event Player.cache_portalStart), True);
				Modify Player Variable(Event Player, preview_array1, Append To Array, Array(Event Player.cache_portalStart[Event Player.preview_i],
					Event Player.cache_portalEnd[Event Player.preview_i]));
				Modify Player Variable(Event Player, preview_array2, Append To Array, Array(Array(Event Player.preview_i, False), Array(
					Event Player.preview_i, True)));
			End;
		End;
		Wait(False, Ignore Condition);
		Event Player.preview_i = Null;
		If(Event Player.addon_toggle3rdPov);
			Event Player.addon_toggle3rdPov = False;
		End;
		Start Camera(Event Player, Event Player.preview_array1[Event Player.preview_i] + Up - (3.500 - 3 * Z Component Of(Throttle Of(
			Event Player))) * Facing Direction Of(Event Player), Event Player.preview_array1[Event Player.preview_i] + Up, 15);
		Set Move Speed(Event Player, False);
		Set Primary Fire Enabled(Event Player, False);
		Set Secondary Fire Enabled(Event Player, False);
		Disallow Button(Event Player, Button(Ability 1));
		Disallow Button(Event Player, Button(Jump));
		While(Is Button Held(Event Player, Button(Primary Fire)) && Is Button Held(Event Player, Button(Secondary Fire)) && Is Alive(
			Event Player) && !Event Player.lockState);
			If(X Component Of(Throttle Of(Event Player)) < -0.500);
				Event Player.preview_i += True;
			Else If(X Component Of(Throttle Of(Event Player)) > 0.500);
				Event Player.preview_i += Count Of(Event Player.preview_array1) - True;
			End;
			Event Player.preview_i %= Count Of(Event Player.preview_array1);
			Wait Until(Absolute Value(X Component Of(Throttle Of(Event Player))) < 0.500, True);
			Wait(False, Ignore Condition);
		End;
		Set Primary Fire Enabled(Event Player, True);
		Set Secondary Fire Enabled(Event Player, True);
		Allow Button(Event Player, Button(Ability 1));
		Allow Button(Event Player, Button(Jump));
		Stop Camera(Event Player);
		Set Move Speed(Event Player, 100);
		Event Player.preview_i = Null;
		Event Player.preview_array1 = Null;
		Event Player.preview_array2 = Null;
	}
}

rule("Command | Restart Run (Crouch + Interact + Deflect)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		(Event Player.editor_lock == False || Event Player != Host Player) == True;
		Event Player.lockState == False;
		Is Button Held(Event Player, Button(Crouch)) == True;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Ability 2)) == True;
	}

	actions
	{
		Event Player.lockState = True;
		If(Global.CompMode);
			Wait(False, Ignore Condition);
			If(Global.CompTime < 1);
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   比赛结束") : Custom String(
					"   Competition is over"));
				Event Player.lockState = False;
				Abort;
			Else If(Event Player.comp_done);
				Event Player.lockState = False;
				Abort;
			Else If(Global.CompRestartLimit && Event Player.checkpoint_notLast);
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   禁止在此比赛中运行期间重新启动") : Custom String(
					"   Restart during run is disabled for this competition"));
				Event Player.lockState = False;
				Abort;
			Else If(Global.CompAtmpNum);
				If(Event Player.comp_countAttempts == Global.CompAtmpNum);
					Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   最后一次尝试") : Custom String(
						"   This is your final attempt"));
					Event Player.lockState = False;
					Abort;
				End;
				If(Event Player.comp_countAttempts < Null);
					Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   你没有尝试过") : Custom String(
						"   You are out of attempts"));
					Event Player.lockState = False;
					Abort;
				End;
				Event Player.comp_countAttempts += True;
				Global.CompAtmpSaveCount[Index Of Array Value(Global.CompAtmpSaveNames, String Split(First Of(Event Player), Empty Array))
					] = Event Player.comp_countAttempts;
			End;
		End;
		Event Player.editor_fly = Null;
		Event Player.checkpoint_current = Null;
		"$$ -Math.INFINITY * (eventPlayer.timer_splitDisplay == -Math.INFINITY)"
		Event Player.timer_splitDisplay = Event Player.timer_splitDisplay == -999999995904.000 ? -999999995904.000 : Null;
		Event Player.toggle_practice = False;
		Event Player.timer_practice = Null;
		Stop Chasing Player Variable(Event Player, timer_practice);
		If(Array Contains(Global.SaveEnt, Event Player));
			Call Subroutine(DeleteSave);
		End;
		If(Is Dead(Event Player));
			"eventPlayer.respawn()"
			Resurrect(Event Player);
		End;
		Call Subroutine(StartGame);
		Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
		Wait(Global.CompMode, Ignore Condition);
		"eventPlayer.allowButton(Button.ABILITY_1)"
		Event Player.lockState = False;
		Wait(0.032, Ignore Condition);
	}
}

rule("Command | Spectate (Hold Interact)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Ability 2)) == False;
		(Event Player.editor_on && (Is Button Held(Event Player, Button(Melee)) || Is Button Held(Event Player, Button(Primary Fire))
			|| Is Button Held(Event Player, Button(Secondary Fire)))) == False;
	}

	actions
	{
		"@Condition editoron == false"
		Wait(True, Abort When False);
		"editor has interact combos"
		If(Event Player.editor_on);
			Wait(True, Abort When False);
		End;
		If(Event Player.toggle_spectate);
			"eventPlayer.enableRespawn()"
			Resurrect(Event Player);
			"eventPlayer.respawn()"
			If(Event Player.toggle_practice);
				Chase Player Variable At Rate(Event Player, timer_practice, 999999995904.000, True, None);
			Else If(Event Player.checkpoint_notLast);
				Call Subroutine(TimerResume);
			End;
			Call Subroutine(CheckpointFailReset);
		Else;
			Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   再次长按互动键关闭观战模式") : Custom String(
				"   Hold Interact again to turn off spectate mode"));
			Event Player.toggle_invincible = False;
			Call Subroutine(TimerPause);
			Stop Chasing Player Variable(Event Player, timer_practice);
			"eventPlayer.disableRespawn()"
			Set Damage Received(Event Player, 100);
			Kill(Event Player, Null);
			Set Damage Received(Event Player, 0);
		End;
		Event Player.toggle_spectate = !Event Player.toggle_spectate;
	}
}

rule("Command | Toggle Invincible Mode (Melee + Reload)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		(Global.CompMode && Event Player.comp_done) == False;
		Event Player.lockState == False;
		Is Alive(Event Player) == True;
		Is Button Held(Event Player, Button(Melee)) == True;
		Is Button Held(Event Player, Button(Reload)) == True;
		Is Button Held(Event Player, Button(Interact)) == False;
	}

	actions
	{
		Event Player.lockState = True;
		Event Player.toggle_invincible = !Event Player.toggle_invincible;
		Event Player.cache_collectedLocks = Empty Array;
		If(Event Player.toggle_invincible);
			Big Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("探点模式") : Custom String("Invincible mode"));
			Call Subroutine(TimerPause);
			Stop Chasing Player Variable(Event Player, timer_practice);
			Start Rule(CheckUlt, Restart Rule);
			Start Rule(CheckDash, Restart Rule);
		Else;
			If(Event Player.toggle_practice);
				Big Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("练习模式") : Custom String("Practice mode"));
				Chase Player Variable At Rate(Event Player, timer_practice, 999999995904.000, True, None);
				Call Subroutine(CheckpointFailReset);
			Else If(Event Player.checkpoint_notLast);
				Big Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("跑图模式") : Custom String("Normal mode"));
				Call Subroutine(TimerResume);
				Call Subroutine(CheckpointFailReset);
			End;
		End;
		Event Player.lockState = False;
		Wait(0.032, Ignore Condition);
	}
}

rule("Command | Toggle Practice Mode (Melee + Ultimate)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.editor_on == False;
		Global.CompMode == False;
		Event Player.lockState == False;
		Is Alive(Event Player) == True;
		Is Button Held(Event Player, Button(Reload)) == False;
		Is Button Held(Event Player, Button(Melee)) == True;
		Is Button Held(Event Player, Button(Ultimate)) == True;
	}

	actions
	{
		Event Player.lockState = True;
		Event Player.toggle_practice = !Event Player.toggle_practice;
		If(Event Player.toggle_practice);
			Big Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("练习模式") : Custom String("Practice mode"));
			Call Subroutine(TimerPause);
			Event Player.checkpoint_practice = Event Player.checkpoint_current;
			"$$ -Math.INFINITY * (eventPlayer.timer_splitDisplay == -Math.INFINITY)"
			Event Player.timer_splitDisplay = Event Player.timer_splitDisplay == -999999995904.000 ? -999999995904.000 : Null;
			Event Player.timer_split = Null;
			Event Player.timer_practice = Null;
			Chase Player Variable At Rate(Event Player, timer_practice, 999999995904.000, True, None);
			If(Event Player.toggle_invincible);
				Event Player.toggle_invincible = False;
				Call Subroutine(CheckpointFailReset);
			End;
		Else;
			Big Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("跑图模式") : Custom String("Normal mode"));
			Stop Chasing Player Variable(Event Player, timer_practice);
			Event Player.checkpoint_current = Event Player.checkpoint_practice;
			Call Subroutine(UpdateCache);
			If(Event Player.checkpoint_notLast && !Event Player.toggle_invincible);
				Event Player.timer_split = Event Player.timer_normal;
				Call Subroutine(TimerResume);
				Call Subroutine(CheckpointFailReset);
			End;
		End;
		Event Player.lockState = False;
		Wait(0.032, Ignore Condition);
	}
}

rule("Command | Restart Practice (Hold Interact)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.editor_on == False;
		Event Player.lockState == False;
		Event Player.toggle_practice != False;
		(Is Alive(Event Player) || Event Player.toggle_spectate) == True;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Crouch)) == False;
		Is Button Held(Event Player, Button(Ultimate)) == False;
		Is Button Held(Event Player, Button(Melee)) == False;
		Is Button Held(Event Player, Button(Ability 2)) == False;
	}

	actions
	{
		"first 2 ifs prevent collide with spec"
		If(Event Player.toggle_spectate);
			Wait Until(Is Alive(Event Player), 999999995904.000);
			Wait Until(!Is Button Held(Event Player, Button(Interact)), 2);
			Abort;
		End;
		Wait Until(!Is Button Held(Event Player, Button(Interact)), 0.900);
		Abort If(Is Button Held(Event Player, Button(Interact)));
		Event Player.timer_practice = Null;
		Event Player.timer_split = Null;
		Event Player.checkpoint_current = Event Player.checkpoint_practice;
		Call Subroutine(UpdateCache);
		Call Subroutine(CheckpointFailReset);
	}
}

rule("Command | Skip (Crouch + Primary-Next | Secondary-Previous)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Count Of(Global.A) > True;
		Global.EditorMoveItem == False;
		(Event Player.editor_lock && Event Player == Host Player) == False;
		(Host Player.editor_on || Event Player.toggle_practice) == True;
		Event Player.lockState == False;
		Is Button Held(Event Player, Button(Crouch)) == True;
		Is Button Held(Event Player, Button(Primary Fire)) != Is Button Held(Event Player, Button(Secondary Fire));
	}

	actions
	{
		"@Condition hostPlayer.editor_on or ( eventPlayer.toggle_practice and eventPlayer.isHoldingButton(Button.ABILITY_1) )"
		Event Player.lockState = True;
		Event Player.timer_split = Null;
		Event Player.timer_practice = Null;
		Event Player.checkpoint_current += Is Button Held(Event Player, Button(Secondary Fire)) ? Count Of(Global.A) - True : True;
		Event Player.checkpoint_current %= Count Of(Global.A);
		Event Player.checkpoint_moved = True;
		Call Subroutine(UpdateCache);
		Call Subroutine(CheckpointFailReset);
		Wait(False, Ignore Condition);
		"faster if you spam button"
		Wait Until(Is Button Held(Event Player, Button(Primary Fire)) == Is Button Held(Event Player, Button(Secondary Fire)), 0.256);
		Loop If Condition Is True;
		"After loop to prevent instant teleports"
		Event Player.lockState = False;
	}
}

rule("Command | Quick Reset (Reload | Hold Reload to Enable)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Reload)) == True;
		Is Button Held(Event Player, Button(Melee)) == False;
		Is Button Held(Event Player, Button(Interact)) == False;
	}

	actions
	{
		If(Event Player.toggle_quickRestart);
			If(Event Player.editor_fly);
				Event Player.editor_fly = Last Of(Global.A[Event Player.checkpoint_current]);
			End;
			Call Subroutine(CheckpointFailReset);
			Wait(0.320, Ignore Condition);
		End;
		Wait(True, Abort When False);
		Event Player.toggle_quickRestart = !Event Player.toggle_quickRestart;
		Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
		Big Message(Event Player, String("Oof") == Custom String("噢") ? (Event Player.toggle_quickRestart ? Custom String("快速回点已启用")
			: Custom String("快速回点已关闭")) : (Event Player.toggle_quickRestart ? Custom String("Quick reset is enabled") : Custom String(
			"Quick reset is disabled")));
	}
}

rule("Command | Toggle Hud (Hold Secondary)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Global.EditorMoveItem == False;
		(Event Player.editor_on && Event Player == Host Player && Is Button Held(Event Player, Button(Melee))) == False;
		Is Button Held(Event Player, Button(Secondary Fire)) == True;
		Is Button Held(Event Player, Button(Primary Fire)) == False;
		"don't trigger during skipping"
		Is Button Held(Event Player, Button(Crouch)) == False;
	}

	actions
	{
		Wait(1.500, Abort When False);
		Event Player.toggle_guide = !Event Player.toggle_guide;
		Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
		Small Message(Event Player, String("Oof") == Custom String("噢") ? (Event Player.toggle_guide ? Custom String("   HUD已隐藏")
			: Custom String("   HUD已开启")) : (Event Player.toggle_guide ? Custom String("   Hud is now hidden") : Custom String(
			"   Hud is now shown")));
	}
}

rule("Command | Toggle Hints (Melee + Deflect)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Global.HintText != Null;
		Is Button Held(Event Player, Button(Melee)) == True;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		(Event Player.toggle_hints || Array Contains(Global.HintCp, Event Player.checkpoint_current)) == True;
	}

	actions
	{
		Event Player.toggle_hints = !Event Player.toggle_hints;
	}
}

rule("Command | Toggle 3rd Person Camera (Hold Crouch + Jump)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		"True if not null"
		Event Player.addon_toggle3rdPov <= True;
		Event Player.lockState == False;
		Event Player.editor_lock == False;
		Is On Ground(Event Player) == True;
		Is Button Held(Event Player, Button(Crouch)) == True;
		Is Button Held(Event Player, Button(Jump)) == True;
	}

	actions
	{
		Wait(True, Abort When False);
		Event Player.addon_toggle3rdPov = !Event Player.addon_toggle3rdPov;
		Call Subroutine(Addon3rdPerson);
	}
}

rule("<tx0C00000000001344> General <tx0C00000000001344>")
{
	event
	{
		Ongoing - Global;
	}
}

rule("General | SUB Update Effect Cache")
{
	event
	{
		Subroutine;
		UpdateCache;
	}

	actions
	{
		"note: if adding cp pos to cache, make sure to also adjust editor things like move and teleport"
		Event Player.cache_bouncePosition = Filtered Array(Global.TQ,
			Global.pinballnumber[Current Array Index] == Event Player.checkpoint_current);
		"eventPlayer.cache_bounceLocks = [_ for _, i in BounceToggleLock if BouncePadCheckpoints[i] == eventPlayer.checkpoint_current and _]\neventPlayer.cache_bounceMaxLocks = len([_ for _ in eventPlayer.cache_bounceLocks if _])"
		Event Player.cache_bounceMaxLocks = Count Of(Filtered Array(Global.BounceToggleLock,
			Global.pinballnumber[Current Array Index] == Event Player.checkpoint_current && Current Array Element));
		Event Player.cache_killPosition = Filtered Array(Global.H,
			Global.killballnumber[Current Array Index] == Event Player.checkpoint_current);
		Event Player.cache_killRadii = Filtered Array(Global.I,
			Global.killballnumber[Current Array Index] == Event Player.checkpoint_current);
		Event Player.cache_portalStart = Filtered Array(Global.CustomPortalStart,
			Global.CustomPortalCP[Current Array Index] == Event Player.checkpoint_current || Global.CustomPortalCP[Current Array Index] < Null);
		Event Player.cache_portalEnd = Filtered Array(Global.CustomPortalEndpoint,
			Global.CustomPortalCP[Current Array Index] == Event Player.checkpoint_current || Global.CustomPortalCP[Current Array Index] < Null);
		Event Player.checkpoint_notLast = Event Player.checkpoint_current < Count Of(Global.A) - True && Count Of(Global.A) > 1;
		Event Player.toggle_hints = False;
		Event Player.banString = Empty Array;
		Wait(False, Ignore Condition);
		If(Event Player.checkpoint_notLast);
			Event Player.ban_multi = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
				"ban Multiclimb - 封禁蹭留"), False, 1) || Array Contains(Global.BanMulti, Event Player.checkpoint_current);
			If(Event Player.ban_multi);
				Event Player.banString = Custom String("∞ {0}", Event Player.banString);
			End;
			Event Player.ban_create = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
				"ban Createbhop - 封禁卡小"), False, 2) || Array Contains(Global.BanCreate, Event Player.checkpoint_current);
			If(Event Player.ban_create);
				Event Player.banString = Custom String("♂ {0}", Event Player.banString);
			End;
			Event Player.ban_standcreate = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
				"ban standcreate - 封禁站卡"), False, 3) || Array Contains(Global.BanStand, Event Player.checkpoint_current);
			If(Event Player.ban_standcreate);
				"≥  √ ▼ ↓"
				Event Player.banString = Custom String("♠ {0}", Event Player.banString);
			End;
			Event Player.ban_dead = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
				"ban Deathbhop - 封禁死小"), False, 4) || Array Contains(Global.BanDead, Event Player.checkpoint_current);
			If(Event Player.ban_dead);
				Event Player.banString = Custom String("X {0}", Event Player.banString);
			End;
			Event Player.ban_emote = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
				"ban Emote Savehop - 封禁表情留小"), False, 5) || Array Contains(Global.BanEmote, Event Player.checkpoint_current);
			If(Event Player.ban_emote);
				Event Player.banString = Custom String("♥ {0}", Event Player.banString);
			End;
			Event Player.ban_climb = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
				"ban Wallclimb - 封禁爬墙"), False, 6) || Array Contains(Global.BanClimb, Event Player.checkpoint_current);
			If(Event Player.ban_climb);
				Event Player.banString = Custom String("↑ {0}", Event Player.banString);
			End;
			Event Player.ban_savedouble = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
				"ban save double - 封禁延二段跳"), False, 7) || Array Contains(Global.BanSaveDouble, Event Player.checkpoint_current);
			If(Event Player.ban_savedouble);
				Event Player.banString = Custom String("△ {0}", Event Player.banString);
			End;
			Event Player.ban_bhop = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
				"require bhop available - 留小跳进点 "), False, 8) || Array Contains(Global.BanBhop, Event Player.checkpoint_current);
			If(Event Player.ban_bhop);
				"≥  √ ▼ ↓"
				Event Player.banString = Custom String("≥ {0}", Event Player.banString);
			End;
			Event Player.ban_djump = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
				"require djump available - 留二段跳 "), False, 9) || Array Contains(Global.BanDjump, Event Player.checkpoint_current);
			If(Event Player.ban_djump);
				"≥  √ ▼ ↓ ︽"
				Event Player.banString = Custom String("» {0}", Event Player.banString);
			End;
		Else;
			Event Player.ban_multi = False;
			Event Player.ban_create = False;
			Event Player.ban_standcreate = False;
			Event Player.ban_dead = False;
			Event Player.ban_emote = False;
			Event Player.ban_climb = False;
			Event Player.ban_savedouble = False;
			Event Player.ban_bhop = False;
			Event Player.ban_djump = False;
		End;
		Wait(False, Ignore Condition);
		Start Rule(CheckUlt, Restart Rule);
		Start Rule(CheckDash, Restart Rule);
		Abort If(!Event Player.editor_on);
		Call Subroutine(EditUpdateSelectedIds);
		Destroy Effect(Event Player.editor_hitboxEffect);
		Create Effect(Event Player.editor_hitboxToggle ? Event Player : Null, Sphere, Color(White),
			Global.A[Event Player.checkpoint_current], 1.400, Visible To Position and Radius);
		Event Player.editor_hitboxEffect = Last Created Entity;
		Create Effect(Event Player.editor_hitboxToggle && Event Player.checkpoint_notLast ? Event Player : Null, Sphere, Color(White),
			Global.A[Event Player.checkpoint_current + True], 1.400, Visible To Position and Radius);
		Modify Player Variable(Event Player, editor_hitboxEffect, Append To Array, Last Created Entity);
		Event Player.editor_bounceIndex = Filtered Array(Mapped Array(Global.pinballnumber,
			Current Array Element == Event Player.checkpoint_current ? Current Array Index : -1), Current Array Element >= Null);
		Event Player.editor_killIndex = Filtered Array(Mapped Array(Global.killballnumber,
			Current Array Element == Event Player.checkpoint_current ? Current Array Index : -1), Current Array Element >= Null);
		If(Event Player.checkpoint_moved && Event Player == Host Player);
			Call Subroutine(EditorSelectLast);
			Event Player.checkpoint_moved = False;
		End;
	}
}

rule("General | SUB Delete Save")
{
	event
	{
		Subroutine;
		DeleteSave;
	}

	actions
	{
		Modify Global Variable(SaveName, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
		Modify Global Variable(SaveCp, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
		Modify Global Variable(SaveTimer, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
		Modify Global Variable(SaveElapsed, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
		"must always be last because its the index itself"
		Modify Global Variable(SaveEnt, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
	}
}

rule("General | SUB Make Save")
{
	event
	{
		Subroutine;
		MakeSave;
	}

	actions
	{
		Modify Global Variable(SaveEnt, Append To Array, Event Player);
		Modify Global Variable(SaveName, Append To Array, String Split(First Of(Event Player), Empty Array));
		Modify Global Variable(SaveCp, Append To Array, Event Player.checkpoint_current);
		Modify Global Variable(SaveTimer, Append To Array, Event Player.timer_normal);
		Modify Global Variable(SaveElapsed, Append To Array, Total Time Elapsed);
	}
}

rule("General | SUB Timer Pause")
{
	event
	{
		Subroutine;
		TimerPause;
	}

	actions
	{
		Stop Chasing Player Variable(Event Player, timer_normal);
		Abort If(!Array Contains(Global.SaveEnt, Event Player));
		Global.SaveTimer[Index Of Array Value(Global.SaveEnt, Event Player)] = Event Player.timer_normal;
		Global.SaveElapsed[Index Of Array Value(Global.SaveEnt, Event Player)] = Null;
	}
}

rule("General | SUB Timer Resume")
{
	event
	{
		Subroutine;
		TimerResume;
	}

	actions
	{
		Chase Player Variable At Rate(Event Player, timer_normal, 999999995904.000, True, None);
		Global.SaveElapsed[Index Of Array Value(Global.SaveEnt, Event Player)] = Total Time Elapsed;
	}
}

rule("General | SUB Leaderboard Update")
{
	event
	{
		Subroutine;
		LeaderboardUpdate;
	}

	actions
	{
		"[[name, seconds, prettytime]]\nyou already have a time"
		If(Array Contains(Mapped Array(Global.LeaderBoardFull, First Of(Current Array Element)), String Split(First Of(Event Player),
			Empty Array)));
			Abort If(Event Player.timer_normal >= First Of(Filtered Array(Global.LeaderBoardFull, First Of(Current Array Element)
				== String Split(First Of(Event Player), Empty Array)))[True]);
			Global.LeaderBoardFull = Filtered Array(Global.LeaderBoardFull, First Of(Current Array Element) != String Split(First Of(
				Event Player), Empty Array));
		Else If(Count Of(Global.LeaderBoardFull) < 25 || Event Player.timer_normal < Last Of(Global.LeaderBoardFull[19]));
			Modify Global Variable(LeaderBoardFull, Remove From Array By Index, 24);
		Else;
			"Full and time too slow"
			Abort;
		End;
		Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(String Split(First Of(Event Player), Empty Array),
			Event Player.timer_normal, Custom String("{0} sec", Event Player.timer_normal))));
		"CreateLeaderboard()"
		Global.LeaderBoardRemake = True;
	}
}

rule("General | SUB Checkpoint Fail")
{
	event
	{
		Subroutine;
		CheckpointFailReset;
	}

	actions
	{
		Event Player.timer_split = Event Player.toggle_practice ? Event Player.timer_practice : Event Player.timer_normal;
		Event Player.cache_collectedLocks = Empty Array;
		Cancel Primary Action(Event Player);
		Event Player.skill_usedDouble = Null;
		If(!(Event Player.checkpoint_current || Event Player.toggle_practice));
			Event Player.timer_normal = Null;
			Event Player.timer_split = Null;
		End;
		If(Count Of(Global.A));
			If(Is Using Ability 1(Event Player) && Global.DashExploitToggle);
				"smallMessage(eventPlayer,\"   0关卡Shift已禁用!\" checkCN \"   Dash Start is banned!\")"
				Start Forcing Player Position(Event Player, Event Player, False);
				Wait Until(!Is Using Ability 1(Event Player), Global.DashExploitToggle);
				Stop Forcing Player Position(Event Player);
			End;
			Teleport(Event Player, Last Of(Global.A[Event Player.checkpoint_current]));
			"After teleport incase stopForcingPosition launches the player"
			Apply Impulse(Event Player, -1 * Velocity Of(Event Player), 0, To World, Cancel Contrary Motion XYZ);
			"old: disallow jump > 0.1 sec wait > allow jump, this method bugs with ult check disabling ultimate for some reason\nif eventPlayer.ban_dead or eventPlayer.ban_emote and eventPlayer.isHoldingButton(Button.JUMP):"
			If(Event Player.ban_dead);
				If(Is Button Held(Event Player, Button(Jump)));
					Press Button(Event Player, Button(Jump));
				End;
			Else;
				"Reset Hop"
				Set Status(Event Player, Null, Rooted, 0.096);
			End;
			If(Is Using Ultimate(Event Player));
				Set Damage Received(Event Player, 100);
				Kill(Event Player, Null);
				Set Damage Received(Event Player, 0);
				Wait(False, Ignore Condition);
			End;
		End;
		Start Rule(CheckUlt, Restart Rule);
		Start Rule(CheckDash, Restart Rule);
		Call Subroutine(AddonCustomLoadAndReset);
	}
}

rule("General | SUB Start Game")
{
	event
	{
		Subroutine;
		StartGame;
	}

	actions
	{
		If(Global.CompMode && (Global.CompTime < 1 || Event Player.comp_done));
			Event Player.toggle_leaderboard = True;
			Event Player.comp_done = True;
			"eventPlayer.disableRespawn()"
			Set Damage Received(Event Player, 100);
			Kill(Event Player, Null);
			Set Damage Received(Event Player, 0);
			Abort;
		End;
		If(Count Of(Global.A));
			"load saved progres"
			If(Array Contains(Global.SaveName, String Split(First Of(Event Player), Empty Array)));
				Global.SaveEnt[Index Of Array Value(Global.SaveName, String Split(First Of(Event Player), Empty Array))] = Event Player;
				Event Player.checkpoint_current = Global.SaveCp[Index Of Array Value(Global.SaveEnt, Event Player)];
				Event Player.timer_normal = Global.SaveTimer[Index Of Array Value(Global.SaveEnt, Event Player)];
			Else;
				Event Player.checkpoint_current = Null;
				Event Player.timer_normal = Null;
				Call Subroutine(MakeSave);
			End;
			Call Subroutine(UpdateTitle);
			Call Subroutine(UpdateCache);
			Call Subroutine(CheckpointFailReset);
			"FFA"
			Wait Until(Is Game In Progress, 999999995904.000);
			Call Subroutine(TimerResume);
		End;
		"eventPlayer.enableRespawn()"
		Event Player.toggle_invincible = False;
		Event Player.toggle_spectate = False;
		Event Player.checkpoint_moved = True;
	}
}

rule("General | Setup & Variables")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Disable Inspector Recording;
		Disable Built-In Game Mode Completion;
		Disable Built-In Game Mode Scoring;
		Disable Built-In Game Mode Music;
		Disable Built-In Game Mode Announcer;
		Start Forcing Spawn Room(All Teams, False);
		Start Forcing Spawn Room(All Teams, 1);
		Start Forcing Spawn Room(All Teams, 2);
		"wait for map data rule"
		Wait(0.240, Ignore Condition);
		"fix team because of naming"
		If(Global.ColorConfig[16] == Color(Team 1));
			Global.ColorConfig[16] = Color(Blue);
		Else If(Global.ColorConfig[16] == Color(Team 2));
			Global.ColorConfig[16] = Color(Red);
		End;
		"prevent same color lock orbs"
		If(Global.ColorConfig[15] == Global.ColorConfig[16]);
			Global.ColorConfig[16] = Global.ColorConfig[15] == Color(Orange) ? Color(Green) : Color(Orange);
		End;
		"prevent same color bhop/climb used/unused"
		If(Global.ColorConfig[7] == Global.ColorConfig[8]);
			Global.ColorConfig[8] = Global.ColorConfig[7] == Color(Red) ? Color(Orange) : Color(Red);
		End;
		Global.SaveName = Empty Array;
		Global.SaveCp = Empty Array;
		Global.SaveTimer = Empty Array;
		Global.SaveEnt = Empty Array;
		"SavePauseTime = []\nSavePauseEnabled = []"
		Global.SaveElapsed = Empty Array;
		"$$"
		If(!Global.Dao && Count Of(Global.Dao) == 1);
			Global.Dao = Array(Null);
		Else;
			Global.Dao = Count Of(Filtered Array(Global.Dao, Current Array Element != -1 && Current Array Element != Empty Array))
				&& Global.Dao ? Global.Dao : Empty Array;
		End;
		If(!Global.SHIFT && Count Of(Global.SHIFT) == 1);
			Global.SHIFT = Array(Null);
		Else;
			Global.SHIFT = Count Of(Filtered Array(Global.SHIFT, Current Array Element != -1 && Current Array Element != Empty Array))
				&& Global.SHIFT ? Global.SHIFT : Empty Array;
		End;
		Global.pinballnumber = Count Of(Global.pinballnumber) ? Global.pinballnumber : Empty Array;
		Global.A = Count Of(Global.A) ? Global.A : Empty Array;
		Global.A = Count Of(Global.A) ? Global.A : Empty Array;
		Global.killballnumber = Count Of(Global.killballnumber) ? Global.killballnumber : Empty Array;
		Global.H = Count Of(Global.H) ? Global.H : Empty Array;
		Global.I = Count Of(Global.I) ? Global.I : Empty Array;
		Global.K = Count Of(Global.K) ? Global.K : Empty Array;
		Global.TQ = Count Of(Global.TQ) ? Global.TQ : Empty Array;
		Global.TQ2 = Count Of(Global.TQ2) ? Global.TQ2 : Empty Array;
		Global.EditMode = Count Of(Global.EditMode) ? Global.EditMode : Empty Array;
		Global.TQ5 = Count Of(Global.TQ5) ? Global.TQ5 : Empty Array;
		Global.TQ6 = Count Of(Global.TQ6) ? Global.TQ6 : Empty Array;
		Global.BounceToggleLock = Count Of(Global.BounceToggleLock) ? Global.BounceToggleLock : Empty Array;
		Global.CustomPortalStart = Count Of(Global.CustomPortalStart) ? Global.CustomPortalStart : Empty Array;
		Global.CustomPortalEndpoint = Count Of(Global.CustomPortalEndpoint) ? Global.CustomPortalEndpoint : Empty Array;
		Global.CustomPortalCP = Count Of(Global.CustomPortalCP) ? Global.CustomPortalCP : Empty Array;
		Global.LeaderBoardFull = Empty Array;
		Global.TitleData = Null;
		Global.HintCp = Empty Array;
		Global.HintText = Empty Array;
		"clean out -1's after the ban has loaded"
		Global.BanBhop = Count Of(Global.BanBhop) ? Filtered Array(Global.BanBhop, Current Array Element + False >= Null) : Empty Array;
		Global.BanClimb = Count Of(Global.BanClimb) ? Filtered Array(Global.BanClimb, Current Array Element + False >= Null) : Empty Array;
		Global.BanEmote = Count Of(Global.BanEmote) ? Filtered Array(Global.BanEmote, Current Array Element + False >= Null) : Empty Array;
		Global.BanDead = Count Of(Global.BanDead) ? Filtered Array(Global.BanDead, Current Array Element + False >= Null) : Empty Array;
		Global.BanCreate = Count Of(Global.BanCreate) ? Filtered Array(Global.BanCreate, Current Array Element + False >= Null)
			: Empty Array;
		Global.BanMulti = Count Of(Global.BanMulti) ? Filtered Array(Global.BanMulti, Current Array Element + False >= Null) : Empty Array;
		"[i for i in BanTriple if i + false >= 0] if len(BanTriple) > 0 else [] # legacy code, now auto sets it to null to save space"
		Global.BanTriple = Null;
		Global.BanStand = Count Of(Global.BanStand) ? Filtered Array(Global.BanStand, Current Array Element + False >= Null) : Empty Array;
		Global.BanSaveDouble = Count Of(Global.BanSaveDouble) ? Global.BanSaveDouble : Empty Array;
		Global.BanDjump = Count Of(Global.BanDjump) ? Global.BanDjump : Empty Array;
		"Check if old map forces ban off"
		If(Count Of(Global.DashExploitToggle));
			"DashExploitToggle = createWorkshopSetting(bool, \"Ban (applies to all levels)\\n封禁(应用于所有关卡)\", \"ban Dash Start - 0关卡Shift\", true, 2)"
			Global.DashExploitToggle = Null;
		End;
		If(Workshop Setting Toggle(Custom String("map settings \n地图设置"), Custom String("Basic Map Validator - 验证地图"), True, 3));
			Start Rule(AddonCheckMap, Do Nothing);
		End;
		Global.PortalOn = Workshop Setting Toggle(Custom String("map settings \n地图设置"), Custom String(
			"enable portals (control maps) - 启用传送门 (占点地图)"), True, 4);
		Global.CompMode = Workshop Setting Toggle(Custom String("Competitive mode\n竞赛模式"), Custom String(
			"Turn on competitive mode - 开启竞赛模式"), False, 100);
		If(Global.CompMode);
			"-! comp minutes !-\n5-240"
			Global.CompTime = Workshop Setting Integer(Custom String("Competitive mode\n竞赛模式"), Custom String("time limit (global) - 时间限制"),
				120, 1, 240, 101);
			"-! comp attempt count !-"
			Global.CompAtmpNum = Workshop Setting Integer(Custom String("Competitive mode\n竞赛模式"), Custom String("attempt count - 尝试次数"), 5, 0,
				500, 102);
			"-! comp restartlimiter !-"
			Global.CompRestartLimit = Workshop Setting Toggle(Custom String("Competitive mode\n竞赛模式"), Custom String(
				"disable restart during run - 竞赛中禁用重新开始"), False, 103);
		Else;
			Global.instructiontext = Null;
	}
}

rule("General | Match time")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		If(Current Game Mode != Game Mode(Skirmish));
			"0.25"
			Wait(False, Ignore Condition);
			"1"
			Set Match Time(False);
			"1.1"
			Wait(False, Ignore Condition);
			"1"
			Set Match Time(False);
			"1.1"
			Wait(False, Ignore Condition);
		End;
		Set Match Time(70);
		Pause Match Time;
		Wait(False, Ignore Condition);
		Global.TimeRemaining = 265;
		While(Global.TimeRemaining || Host Player.editor_saveHud);
			Wait(60, Ignore Condition);
			If(!Host Player.editor_saveHud);
				Global.TimeRemaining -= True;
				If(Global.CompMode);
					Global.CompTime -= True;
					If(!Global.CompTime);
						Big Message(First Of(True), String("Oof") == Custom String("噢") ? Custom String("时间到了") : Custom String("time's up"));
						All Players(All Teams).comp_done = True;
						Stop Chasing Player Variable(All Players(All Teams), timer_normal);
						"getAllPlayers().disableRespawn()"
						Set Damage Received(All Players(All Teams), 100);
						Kill(All Players(All Teams), Null);
					End;
				End;
			End;
		End;
		Big Message(First Of(True), String("Oof") == Custom String("噢") ? Custom String("房间已达最大持续时间, 即将重启") : Custom String(
			"maximum lobby time elapsed, restarting"));
		Wait(5, Ignore Condition);
		"Prevent crash during POTG and closing lobby"
		All Players(All Teams).lockState = True;
		Declare Player Victory(Host Player);
		Declare Team Victory(Team Of(Host Player));
	}
}

rule("General | Player Initialize")
{
	event
	{
		Player Joined Match;
		All;
		All;
	}

	conditions
	{
		Is Dummy Bot(Event Player) == False;
	}

	actions
	{
		Enable Death Spectate All Players(Event Player);
		Enable Death Spectate Target HUD(Event Player);
		Disable Game Mode HUD(Event Player);
		Disable Movement Collision With Players(Event Player);
		Disable Built-In Game Mode Respawning(Event Player);
		Preload Hero(Event Player, Hero(Genji));
		Set Damage Received(Event Player, 0);
		"Turn Editor On"
		Event Player.editor_on = Workshop Setting Toggle(Custom String("map settings \n地图设置"), Custom String("Editor mode - 作图模式"), True,
			-1);
		Event Player.editor_lock = True;
		Event Player.toggle_guide = True;
		Event Player.cache_bounceTouched = -1;
		"big waits first for about 1 second before loading, to make sure things like comp mode are fully loaded and configured, load fx in meanwhile"
		Wait(True, Ignore Condition);
		Create Effect(Event Player, Ring, Global.ColorConfig[9], Last Of(Global.A[Event Player.checkpoint_current]), True,
			Position and Radius);
		Create Effect(Event Player.checkpoint_notLast ? Event Player : Null, Ring, Global.ColorConfig[10],
			Global.A[Event Player.checkpoint_current + True], True, Visible To Position and Radius);
		Create Effect(Event Player.checkpoint_notLast ? Event Player : Null, Light Shaft, Global.ColorConfig[11],
			Global.A[Event Player.checkpoint_current + True], True, Visible To Position and Radius);
		Create Icon(Event Player.checkpoint_notLast ? Event Player : Null, Global.A[Event Player.checkpoint_current + True] + Up,
			Arrow: Down, Visible To and Position, Global.ColorConfig[12], True);
		Wait Until(Has Spawned(Event Player), 999999995904.000);
		Event Player.editor_lock = False;
		If(Global.CompMode);
			Set Invisible(Event Player, All);
			If(Array Contains(Global.CompAtmpSaveNames, String Split(First Of(Event Player), Empty Array)));
				Event Player.comp_countAttempts = Global.CompAtmpSaveCount[Index Of Array Value(Global.CompAtmpSaveNames, String Split(First Of(
					Event Player), Empty Array))];
			"instructions and settings for comp start"
			Else;
				Event Player.comp_instructionHud = True;
				Modify Global Variable(CompAtmpSaveNames, Append To Array, String Split(First Of(Event Player), Empty Array));
				Modify Global Variable(CompAtmpSaveCount, Append To Array, 1);
				Event Player.comp_countAttempts = 1;
				Set Move Speed(Event Player, False);
				Set Ability 1 Enabled(Event Player, False);
				Set Ultimate Ability Enabled(Event Player, False);
				Wait Until(!Is Button Held(Event Player, Button(Interact)), True);
				Wait Until(Is Button Held(Event Player, Button(Interact)) || Global.CompTime < 1, 999999995904.000);
				Set Move Speed(Event Player, 100);
				Event Player.comp_instructionHud = False;
			End;
			If(Event Player.comp_countAttempts < Null || Global.CompTime < 1);
				Event Player.comp_done = True;
			End;
		End;
		Wait(False, Ignore Condition);
		"initialization of the game"
		Call Subroutine(StartGame);
	}
}

rule("General | Player Leaves")
{
	event
	{
		Player Left Match;
		All;
		All;
	}

	actions
	{
		If(Global.SaveCp[Index Of Array Value(Global.SaveEnt, Event Player)]);
			If(Global.SaveCp[Index Of Array Value(Global.SaveEnt, Event Player)] < Count Of(Global.A)
				- True && Global.SaveElapsed[Index Of Array Value(Global.SaveEnt, Event Player)]);
				Global.SaveTimer[Index Of Array Value(Global.SaveEnt, Event Player)
					] = Total Time Elapsed - Global.SaveElapsed[Index Of Array Value(Global.SaveEnt, Event Player)
					] + Global.SaveTimer[Index Of Array Value(Global.SaveEnt, Event Player)];
			End;
		"delete if player didnt do first cp"
		Else;
			Call Subroutine(DeleteSave);
	}
}

rule("General | Ground: Traces, Arrive, & Reset")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Dummy Bot(Event Player) == False;
		Is On Ground(Event Player) == True;
		Is Alive(Event Player) == True;
	}

	actions
	{
		If(!Event Player.checkpoint_notLast);
			If(Is Moving(Event Player) && !(
				Event Player.toggle_practice || Event Player.toggle_invisible || Event Player.editor_on || Global.CompMode));
				"traces ----------------------------------------------------------------------------------------------------"
				Event Player.cache_rainbow = Array(Color(Red), Color(Orange), Color(Yellow), Color(Lime Green), Color(Green), Color(Turquoise),
					Color(Blue), Color(Purple), Color(Violet), Color(Rose))[Round To Integer(Total Time Elapsed * 2, Down) % 10];
				"eventPlayer.cache_rainbow =  rgb((cosDeg(getTotalTimeElapsed()/2 * 360 - 0) + 0.5) * 255, (cosDeg(getTotalTimeElapsed/2 * 360 - 120) + 0.5) * 255, (cosDeg(getTotalTimeElapsed/2 * 360 - 240) + 0.5) * 255)\n1.6 - 0.2 in 0.2 steps"
				Play Effect(First Of(True), Ring Explosion, Event Player.cache_rainbow, Position Of(Event Player), 0.400);
				Wait(0.048, Ignore Condition);
				Play Effect(First Of(True), Ring Explosion, Event Player.cache_rainbow, Position Of(Event Player), 0.600);
				Wait(0.048, Ignore Condition);
				Play Effect(First Of(True), Ring Explosion, Event Player.cache_rainbow, Position Of(Event Player), 0.800);
				Wait(0.048, Ignore Condition);
				Play Effect(First Of(True), Ring Explosion, Event Player.cache_rainbow, Position Of(Event Player), 1);
				Wait(0.048, Ignore Condition);
				Play Effect(First Of(True), Ring Explosion, Event Player.cache_rainbow, Position Of(Event Player), 1.200);
				Wait(0.048, Ignore Condition);
				Play Effect(First Of(True), Ring Explosion, Event Player.cache_rainbow, Position Of(Event Player), 1.400);
				Wait(0.048, Ignore Condition);
			End;
		Else If(Event Player.toggle_invincible || (Global.CompMode && !Global.CompTime) || Event Player.lockState);
		Else If(Distance Between(Event Player, Global.A[Event Player.checkpoint_current + True]) <= 1.400);
			"arrived ----------------------------------------------------------------------------------------------------\nkill player if not colleted the locks"
			If(Count Of(Event Player.cache_collectedLocks) < Event Player.cache_bounceMaxLocks);
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   ! 进点前需集齐所有收集球 !") : Custom String(
					"   ! collect ALL {0} orbs to unlock !", Global.ColorConfig[16]));
				"kill(eventPlayer, null)"
				Call Subroutine(CheckpointFailReset);
				Skip(61);
			End;
			If(Event Player.ban_climb && Event Player.skill_usedClimb);
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   爬墙 ↑ 已禁用!") : Custom String(
					"   Climb ↑ is banned!"));
				Call Subroutine(CheckpointFailReset);
				Skip(56);
			End;
			If(Event Player.ban_bhop && Event Player.skill_usedBhop);
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   ≥ 留小跳进点!") : Custom String(
					"   ≥ Must have a bhop to complete!"));
				Call Subroutine(CheckpointFailReset);
				Skip(51);
			End;
			If(Event Player.ban_djump && Event Player.skill_usedDouble);
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   » 留二段跳!") : Custom String(
					"   » Must have a double jump to complete!"));
				Call Subroutine(CheckpointFailReset);
				Skip(46);
			End;
			Event Player.checkpoint_moved = True;
			Event Player.checkpoint_current += True;
			Call Subroutine(UpdateCache);
			"remove ult feature disabled for speedruning purposes\nif eventPlayer.isUsingUltimate() and not eventPlayer.checkpoint_current in BladeEnabledCheckpoints:\nCheckpointFailReset()\nteleport cps"
			If(Count Of(Global.A[Event Player.checkpoint_current]) > 1);
				Call Subroutine(CheckpointFailReset);
			End;
			If(Event Player.timer_splitDisplay != -999999995904.000);
				Event Player.timer_splitDisplay = (Event Player.toggle_practice ? Event Player.timer_practice : Event Player.timer_normal)
					- Event Player.timer_split;
			End;
			Wait(False, Ignore Condition);
			Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
			Play Effect(Global.CompMode || Event Player.toggle_invisible ? Event Player : True, Ring Explosion, Color(Sky Blue),
				Global.A[Event Player.checkpoint_current] + Vector(False, 1.500, False), 4);
			"msg disabled due to annoying new sound\nbigMessage(eventPlayer,  \"{1} {0}\".format(eventPlayer.checkpoint_current, \"抵达检查点\" checkCN \"Arrived at level\")   )"
			Wait(False, Ignore Condition);
			Call Subroutine(UpdateTitle);
			Call Subroutine(AddonCustomLoadAndReset);
			If(Event Player.toggle_practice);
				Event Player.timer_split = Event Player.timer_practice;
			Else;
				Event Player.timer_split = Event Player.timer_normal;
				Call Subroutine(DeleteSave);
				"complete lvl"
				If(Event Player.checkpoint_current == Count Of(Global.A) - True && !Event Player.editor_on);
					Stop Chasing Player Variable(Event Player, timer_normal);
					Wait(False, Ignore Condition);
					Big Message(First Of(True), Custom String("{0} {1} {2} sec", Event Player, String("Oof") == Custom String("噢") ? Custom String(
						"已通关! 用时") : Custom String("Mission complete! Time"), Event Player.timer_normal));
					Call Subroutine(LeaderboardUpdate);
					If(Global.CompMode && Global.CompAtmpNum);
						If(Event Player.comp_countAttempts == Global.CompAtmpNum);
							Global.CompAtmpSaveCount[Index Of Array Value(Global.CompAtmpSaveNames, String Split(First Of(Event Player), Empty Array))] = -1;
							Event Player.comp_countAttempts = -1;
							Event Player.comp_done = True;
							Event Player.toggle_leaderboard = True;
							"eventPlayer.disableRespawn()"
							Set Damage Received(Event Player, 100);
							Kill(Event Player, Null);
							Set Damage Received(Event Player, 0);
						Else;
							Global.CompAtmpSaveCount[Index Of Array Value(Global.CompAtmpSaveNames, String Split(First Of(Event Player), Empty Array))
								] = Event Player.comp_countAttempts + True;
						End;
					End;
				"update save"
				Else;
					Call Subroutine(MakeSave);
				End;
			End;
		Else If(Distance Between(Event Player, Last Of(Global.A[Event Player.checkpoint_current])) > 1.400);
			Call Subroutine(CheckpointFailReset);
		End;
		Event Player.cache_collectedLocks = Empty Array;
		Wait(0.048, Ignore Condition);
		Loop If Condition Is True;
	}
}

rule("General | Boundary Sphere")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.cache_killPosition != Empty Array;
		Event Player.toggle_invincible == False;
		Event Player.checkpoint_notLast != False;
		Is True For Any(Event Player.cache_killRadii, Normalize(Current Array Element) * Distance Between(
			Event Player.cache_killPosition[Current Array Index], Event Player) < Current Array Element) == True;
	}

	actions
	{
		Call Subroutine(CheckpointFailReset);
	}
}

rule("General | Bounce Ball / Orb")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.cache_bouncePosition != Empty Array;
		"@Condition eventPlayer.checkpoint_notLast # disabled coz editor"
		Is True For Any(Event Player.cache_bouncePosition, Distance Between(Current Array Element, Position Of(Event Player) + Up * 0.700)
			< 1.400) == True;
	}

	actions
	{
		Event Player.cache_bounceTouched = Index Of Array Value(Global.TQ, Filtered Array(Global.TQ,
			Global.pinballnumber[Current Array Index] == Event Player.checkpoint_current && Current Array Index != Event Player.cache_bounceTouched && !Array Contains(
			Event Player.cache_collectedLocks, Current Array Index) && Distance Between(Event Player + Up * 0.700, Current Array Element)
			< 1.400));
		"prevent same one trigering twice in a row"
		If(Event Player.cache_bounceTouched >= Null);
			If(Global.BounceToggleLock[Event Player.cache_bounceTouched]);
				Modify Player Variable(Event Player, cache_collectedLocks, Append To Array, Event Player.cache_bounceTouched);
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   弹球已收集") : Custom String(
					"   orb has been collected"));
			End;
			If(Global.EditMode[Event Player.cache_bounceTouched] > Null);
				Apply Impulse(Event Player, Up, Global.EditMode[Event Player.cache_bounceTouched], To World, Cancel Contrary Motion XYZ);
			Else If(Global.EditMode[Event Player.cache_bounceTouched] < Null);
				Cancel Primary Action(Event Player);
				Event Player.skill_usedDouble = Null;
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   二段跳已就绪") : Custom String(
					"   Double Jump is ready"));
			End;
			If(Global.TQ5[Event Player.cache_bounceTouched]);
				Set Ultimate Ability Enabled(Event Player, True);
				Set Ultimate Charge(Event Player, 100);
				Small Message(Event Player, Custom String("   {0} {1} ", Ability Icon String(Hero(Genji), Button(Ultimate)), String("Oof")
					== Custom String("噢") ? Custom String("终极技能已就绪") : Custom String("Ultimate is ready")));
			End;
			If(Global.TQ6[Event Player.cache_bounceTouched]);
				If(Is Using Ability 1(Event Player));
					Wait Until(!Is Using Ability 1(Event Player), True);
					Wait(False, Ignore Condition);
				End;
				Set Ability 1 Enabled(Event Player, True);
				Small Message(Event Player, Custom String("   {0} {1} ", Ability Icon String(Hero(Genji), Button(Ability 1)), String("Oof")
					== Custom String("噢") ? Custom String("技能1影已就绪") : Custom String("Dash is ready")));
			End;
			Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
		End;
		Wait(0.240, Ignore Condition);
		Loop If Condition Is True;
		Event Player.cache_bounceTouched = -1;
	}
}

rule("General | Death Reset")
{
	event
	{
		Player Died;
		All;
		All;
	}

	conditions
	{
		Is Dummy Bot(Event Player) == False;
		Event Player.toggle_spectate == False;
		Event Player.comp_done == False;
	}

	actions
	{
		If(Count Of(Global.A));
			Resurrect(Event Player);
		Else;
			Respawn(Event Player);
		End;
		Call Subroutine(CheckpointFailReset);
		"rest is to prevent dead spamming from crashing server\nbut doing waits only when needed without relying on a variable count"
		Wait Until(Is Alive(Event Player), True);
		Wait Until(Is Dead(Event Player), True);
		If(Is Dead(Event Player) && !(Event Player.toggle_spectate || Event Player.comp_done));
			Wait(0.160, Ignore Condition);
			Resurrect(Event Player);
			Call Subroutine(CheckpointFailReset);
			Wait Until(Is Alive(Event Player), True);
			Wait Until(Is Dead(Event Player), True);
			If(Is Dead(Event Player) && !(Event Player.toggle_spectate || Event Player.comp_done));
				Wait(0.440, Ignore Condition);
				Resurrect(Event Player);
				Call Subroutine(CheckpointFailReset);
				Wait Until(Is Alive(Event Player), True);
				Wait Until(Is Dead(Event Player), True);
				If(Is Dead(Event Player) && !(Event Player.toggle_spectate || Event Player.comp_done));
					Wait(0.640, Ignore Condition);
					Respawn(Event Player);
					Call Subroutine(CheckpointFailReset);
	}
}

rule("<tx0C00000000001344> Huds <tx0C00000000001344>")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Huds | Global Localplayer")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Wait(True, Ignore Condition);
		"name/credit construction\nnote on changing default name/credit\nif you change it, also change it in the credits rule\nthe old credits should always remain valid here to keep old data valid"
		If(Global.Name == Custom String("name here - 作者"));
			"Legacy Credits"
			Global.Name = First Of(Global.Cachedcredits);
		End;
		If(!Global.Name);
			Global.Name = Custom String("name here - 作者");
		End;
		If(Global.Code == Custom String("code here - 代码"));
			"Legacy Credits"
			Global.Code = Last Of(Global.Cachedcredits);
		End;
		If(!Global.Code);
			Global.Code = Custom String("code here - 代码");
		End;
		Global.Cachedcredits = Null;
		"hudSubtext(localPlayer.toggle_guide, \"Discord: dsc.gg/genjiparkour\" LeftAlign96, HudPosition.LEFT, HO.data_dsc, ColorConfig[Customize.dsc], HudReeval.VISIBILITY, SpecVisibility.DEFAULT)"
		Create HUD Text(First Of(True), Null, Local Player.toggle_guide ? Custom String("Discord: dsc.gg/genjiparkour") : Empty Array,
			String("Oof") == Custom String("噢") ? Custom String(
			"作者: {0}                                                                                                ", Global.Name)
			: Custom String("Made by: {0}                                                                                                ",
			Global.Name), Left, -200, Null, Global.ColorConfig[18], First Of(Global.ColorConfig), Visible To and String,
			Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		Create HUD Text(First Of(True), Null, Null, String("Oof") == Custom String("噢") ? Custom String(
			"代码: {0}                                                                                                ", Global.Code)
			: Custom String(
			"Map code: {0}                                                                                                ", Global.Code),
			Left, -199, Null, Null, Global.ColorConfig[True], Visible To and String, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		"global huds"
		Create HUD Text(First Of(True), Null, String("Oof") == Custom String("噢") ? Custom String("房间将在 {0} 分钟后重启 - v1.10.3E{1}",
			Global.TimeRemaining, Text Count >= 128 ? Custom String("\n错误: 已达到最大HUD数量上限") : Empty Array) : Custom String(
			"Server Restart in {0} Min - v1.10.3E{1}", Global.TimeRemaining, Text Count >= 128 ? Custom String(
			"\nerror: max hud count reached") : Empty Array), Null, Right, -162, Null, Global.ColorConfig[2], Null, Visible To and String,
			Visible Always);
		"padding for custom hud display"
		Create HUD Text(First Of(True), Null, Null, Custom String(
			"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nv"), Top, -164, Null, Null, Color(
			Orange), Visible To, Default Visibility);
		Create HUD Text(Local Player.toggle_guide, Null, Null, String("Oof") == Custom String("噢") ? Custom String("{0} {1} | {2}快速回点",
			Local Player.toggle_quickRestart ? Empty Array : Custom String("长按"), Input Binding String(Button(Reload)),
			Local Player.toggle_quickRestart ? Empty Array : Custom String("启用")) : Custom String("{0} {1} |{2} quick reset",
			Local Player.toggle_quickRestart ? Empty Array : Custom String("Hold"), Input Binding String(Button(Reload)),
			Local Player.toggle_quickRestart ? Empty Array : Custom String(" Enable")), Right, -157, Null, Null, Global.ColorConfig[5],
			Visible To and String, Default Visibility);
		Create HUD Text(Local Player.toggle_guide, Null, Null, String("Oof") == Custom String("噢") ? Custom String("{0} + {1} | 探点模式{2}",
			Input Binding String(Button(Reload)), Input Binding String(Button(Melee)), Local Player.toggle_invincible ? Custom String(
			" | 启用") : Empty Array) : Custom String("{0} + {1} | Invincible{2}", Input Binding String(Button(Reload)),
			Input Binding String(Button(Melee)), Local Player.toggle_invincible ? Custom String(" | ON") : Empty Array), Right, -154, Null,
			Null, Local Player.toggle_invincible ? Evaluate Once(Global.ColorConfig[6]) : Evaluate Once(Global.ColorConfig[5]),
			Visible To String and Color, Default Visibility);
		Create HUD Text(First Of(True), Null, Local Player.toggle_guide ? Empty Array : Custom String("{0}{1}{2}",
			Local Player.toggle_invincible ? Ability Icon String(Hero(Baptiste), Button(Ability 2)) : Empty Array,
			Local Player.toggle_practice ? Ability Icon String(Hero(D.Va), Button(Ultimate)) : Empty Array,
			Local Player.toggle_invisible ? Ability Icon String(Hero(Sombra), Button(Ability 1)) : Empty Array), String("Oof")
			== Custom String("噢") ? Custom String("长按 {0} | 切换显示HUD", Input Binding String(Button(Secondary Fire))) : Custom String(
			"Hold {0} | toggle hud", Input Binding String(Button(Secondary Fire))), Right, -161, Global.ColorConfig[5],
			Global.ColorConfig[5], Global.ColorConfig[5], Visible To and String, Default Visibility);
		Create HUD Text(Local Player.toggle_guide, Null, Null, String("Oof") == Custom String("噢") ? Custom String("长按 {0} + {1} | 预览关卡",
			Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire))) : Custom String(
			"Hold {0} + {1} | Preview cp", Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire))),
			Right, -160, Null, Null, Local Player.preview_array1 ? Evaluate Once(Global.ColorConfig[6]) : Evaluate Once(
			Global.ColorConfig[5]), Visible To String and Color, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		Create HUD Text(Local Player.preview_array1 && Local Player.toggle_guide ? Local Player : Null, Null, String("Oof")
			== Custom String("噢") ? Custom String("移动键 ◀ ▶ | 预览其他\n移动键 ◀ ▶ | 修改间距 \n视角移动 | 调整浏览视角") : Custom String(
			"Walk ◀ ▶ | preview others\nWalk ▲ ▼ | modify zoom\nAim | change preview angle"), Null, Top, -171, Null, Global.ColorConfig[6],
			Null, Visible To and String, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		Create HUD Text(Local Player, Null, Null,
			Local Player.timer_splitDisplay == -999999995904.000 || Local Player.toggle_spectate ? Empty Array : (String("Oof")
			== Custom String("噢") ? Custom String(
			"单关用时 {0}                                                                                                ",
			Local Player.timer_splitDisplay) : Custom String(
			"Split: {0}                                                                                                ",
			Local Player.timer_splitDisplay)), Left, -195, Null, Null, Global.ColorConfig[3], Visible To and String, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		"text per checkpoint  text per cp each"
		If(Count Of(Global.CpHudText));
			Create HUD Text(Local Player, Array Contains(Global.CpHudCp, Local Player.checkpoint_current)
				&& Local Player.toggle_guide ? Global.CpHudText[Index Of Array Value(Global.CpHudCp, Local Player.checkpoint_current)
				] : Empty Array, String("Oof") == Custom String("噢") ? Custom String("(文本已隐藏)") : (Array Contains(Global.CpHudCp,
				Local Player.checkpoint_current) && !Local Player.toggle_guide ? Custom String("(text hidden)") : Empty Array), Null, Top,
				-169, Color(Blue), Color(Blue), Color(Blue), Visible To and String, Default Visibility);
		End;
		If(Count Of(Global.CpIwtText));
			Create In-World Text(Local Player, Array Contains(Global.CpIwtCp, Local Player.checkpoint_current)
				? Global.CpIwtText[Index Of Array Value(Global.CpIwtCp, Local Player.checkpoint_current)] : Empty Array,
				Global.CpIwtPos[Index Of Array Value(Global.CpIwtCp, Local Player.checkpoint_current)], 2, Clip Against Surfaces,
				Visible To Position and String, Global.CpIwtColor, Default Visibility);
		End;
		"Remove no hints - visual and element bloat"
		If(Count Of(Global.HintText));
			Create HUD Text(First Of(Local Player.toggle_guide && Array Contains(Global.HintCp, Local Player.checkpoint_current)), Null,
				String("Oof") == Custom String("噢") ? (Local Player.toggle_hints ? Custom String("― ― ― ― ― 提示 ― ― ― ― ―\n {0} ",
				Global.HintText[Index Of Array Value(Global.HintCp, Local Player.checkpoint_current)]) : Custom String("――――――  有可用提示 ――――――"))
				: (Local Player.toggle_hints ? Custom String("― ― ― ― ― Hint ― ― ― ― ―\n {0} ", Global.HintText[Index Of Array Value(
				Global.HintCp, Local Player.checkpoint_current)]) : Custom String("― ― ― hint available ― ― ―")), Custom String(
				"{0} + {1} | {2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Melee)), String("Oof")
				== Custom String("噢") ? (Local Player.toggle_hints ? Custom String("隐藏提示") : Custom String("获取提示")) : (
				Local Player.toggle_hints ? Custom String("hide hint") : Custom String("show hint"))), Right, -151, Color(Blue),
				Local Player.toggle_hints ? Color(Green) : Color(Orange), Array Contains(Global.HintCp, Local Player.checkpoint_current)
				? Evaluate Once(Global.ColorConfig[5]) : Color(Gray), Visible To String and Color, Default Visibility);
			Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		End;
		If(Global.CompMode);
			Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.comp_instructionHud), Custom String(
				"                                                                                                                           "),
				Null, Null, Top, -181, Color(White), Null, Null, Visible To, Default Visibility);
			If(First Of(Global.instructiontext));
				Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.comp_instructionHud), Null, Null, First Of(
					Global.instructiontext), Top, -180, Null, Null, Color(White), Visible To, Default Visibility);
			End;
			If(Global.instructiontext[True]);
				Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.comp_instructionHud), Null, Null,
					Global.instructiontext[True], Top, -179, Null, Null, Color(White), Visible To, Default Visibility);
			End;
			If(Global.instructiontext[2]);
				Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.comp_instructionHud), Null, Null,
					Global.instructiontext[2], Top, -178, Null, Null, Color(White), Visible To, Default Visibility);
			End;
			If(Global.instructiontext[3]);
				Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.comp_instructionHud), Null, Null,
					Global.instructiontext[3], Top, -177, Null, Null, Color(White), Visible To, Default Visibility);
			End;
			Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.comp_instructionHud), Custom String(
				"                                   Press {0} to start                                ", Input Binding String(Button(
				Interact))), Null, Null, Top, -176, Color(White), Null, Null, Visible To and String, Default Visibility);
		Else;
			Create HUD Text(Local Player.toggle_guide, Null, Null, String("Oof") == Custom String("噢") ? Custom String("长按 {0} | 观战模式{1}",
				Input Binding String(Button(Interact)), Local Player.toggle_spectate ? Custom String(" | 启用") : Empty Array) : Custom String(
				"Hold {0} | Spectate{1}", Input Binding String(Button(Interact)), Local Player.toggle_spectate ? Custom String(" | ON")
				: Empty Array), Right, -155, Null, Null, Local Player.toggle_spectate ? Evaluate Once(Global.ColorConfig[6]) : Evaluate Once(
				Global.ColorConfig[5]), Visible To String and Color, Default Visibility);
			Create HUD Text(Local Player.toggle_guide, Null, Null, String("Oof") == Custom String("噢") ? Custom String("长按 {0} | 隐身模式{1}",
				Input Binding String(Button(Ability 2)), Local Player.toggle_invisible ? Custom String(" | 启用") : Empty Array) : Custom String(
				"Hold {0} | invisible{1}", Input Binding String(Button(Ability 2)), Local Player.toggle_invisible ? Custom String(" | ON")
				: Empty Array), Right, -158, Null, Null, Local Player.toggle_invisible ? Evaluate Once(Global.ColorConfig[6]) : Evaluate Once(
				Global.ColorConfig[5]), Visible To String and Color, Default Visibility);
			Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
			Create HUD Text(Local Player.toggle_guide, Null, Null, String("Oof") == Custom String("噢") ? Custom String("{0} + {1} | 练习模式{2}",
				Input Binding String(Button(Ultimate)), Input Binding String(Button(Melee)), Local Player.toggle_practice ? Custom String(
				" | ({0})", Local Player.checkpoint_practice) : Empty Array) : Custom String("{0} + {1} | Practice{2}", Input Binding String(
				Button(Ultimate)), Input Binding String(Button(Melee)), Local Player.toggle_practice ? Custom String(" | ({0})",
				Local Player.checkpoint_practice) : Empty Array), Right, -153, Null, Null, Local Player.toggle_practice ? Evaluate Once(
				Global.ColorConfig[6]) : Evaluate Once(Global.ColorConfig[5]), Visible To String and Color, Default Visibility);
			Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
			Create HUD Text(Filtered Array(All Players(All Teams),
				Current Array Element.toggle_practice && Current Array Element.toggle_guide), Null, String("Oof") == Custom String("噢")
				? Custom String("{0} + {1} | 下一关\n{0} + {2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)),
				Custom String("{0} | 上一关\n{1} | 回到练习模式起点 ", Input Binding String(Button(Secondary Fire)), Input Binding String(Button(
				Interact)))) : Custom String("{0} + {1} | Next level\n{0} + {2}", Input Binding String(Button(Crouch)), Input Binding String(
				Button(Primary Fire)), Custom String("{0} | Previous level\n{1} | Start from practice cp ", Input Binding String(Button(
				Secondary Fire)), Input Binding String(Button(Interact)))), Null, Right, -152, Null, Evaluate Once(Global.ColorConfig[6]),
				Null, Visible To String and Color, Default Visibility);
			Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		End;
		"if not hostPlayer.editor_on:\nfind the value"
		Global.Difficultyhud = Array(Workshop Setting Combo(Custom String("map settings \n地图设置"), Custom String(
			"difficulty (display hud) - 难度 (顶部hud)"), 0, Array(Custom String("<fg27AAFFFF>playtest - 游戏测试"), Custom String(
			"<fgA0E81BFF>easy-"), Custom String("<fgA0E81BFF>easy"), Custom String("<fgA0E81BFF>easy+"), Custom String(
			"<fge0e000FF>medium-"), Custom String("<fge0e000FF>medium"), Custom String("<fge0e000FF>medium+"), Custom String(
			"<fgEC9900FF>hard-"), Custom String("<fgEC9900FF>hard"), Custom String("<fgEC9900FF>hard+"), Custom String(
			"<fgFF4500FF>very hard-"), Custom String("<fgFF4500FF>very hard"), Custom String("<fgFF4500FF>very hard+"), Custom String(
			"<fgC80013FF>extreme-"), Custom String("<fgC80013FF>extreme"), Custom String("<fgC80013FF>extreme+"), Custom String(
			"<fg960000FF>hell"), Custom String("don't display - 不显示")), 0), Workshop Setting Toggle(Custom String("map settings \n地图设置"),
			Custom String("Playtest display - 游戏测试"), False, 1));
		"display\n17th entry is 'dont display'"
		If(First Of(Global.Difficultyhud) != 17);
			Create HUD Text(Local Player.toggle_guide && !Local Player.toggle_leaderboard ? Local Player : Null, Last Of(Global.Difficultyhud)
				? (String("Oof") == Custom String("噢") ? Custom String("游戏测试") : Custom String("Playtest")) : Empty Array, Array(Custom String(
				"playtest"), Custom String("easy -"), Custom String("easy"), Custom String("easy +"), Custom String("medium -"), Custom String(
				"medium"), Custom String("medium +"), Custom String("hard -"), Custom String("hard"), Custom String("hard +"), Custom String(
				"very hard -"), Custom String("very hard"), Custom String("very hard +"), Custom String("extreme -"), Custom String("extreme"),
				Custom String("extreme +"), Custom String("hell"), Null)[First Of(Global.Difficultyhud)], Null, Top, -173, Color(Blue), Array(
				Color(Blue), Color(Lime Green), Color(Lime Green), Color(Lime Green), Color(Yellow), Color(Yellow), Color(Yellow), Color(
				Orange), Color(Orange), Color(Orange), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0,
				255), Color(Red), Color(Red), Color(Red), Custom Color(150, 0, 0, 255), Null)[First Of(Global.Difficultyhud)], Color(Blue),
				Visible To and String, Default Visibility);
			Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		End;
		"restart + leaderboard\nthis is remade in editor to not include leaderboard"
		Create HUD Text(Local Player.toggle_guide, Null, Null, String("Oof") == Custom String("噢") ? Custom String("{0} + {1} + {2}",
			Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 2)), Custom String("{0} | 重新开始\n长按 {1} | 完整成绩排名",
			Input Binding String(Button(Interact)), Input Binding String(Button(Melee)))) : Custom String("{0} + {1} + {2}",
			Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 2)), Custom String(
			"{0} | Restart\nHold {1} | leaderboard", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)))), Right,
			-156, Null, Null, Global.ColorConfig[5], Visible To and String, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
	}
}

rule("Huds | Leaderboard")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Global.LeaderBoardRemake != False;
	}

	actions
	{
		"account for delay in completion"
		Wait(False, Ignore Condition);
		While(Count Of(Global.LeaderBoardHuds));
			Destroy HUD Text(First Of(Global.LeaderBoardHuds));
			Modify Global Variable(LeaderBoardHuds, Remove From Array By Index, False);
		End;
		"top 5"
		Global.LeaderBoardFull = Sorted Array(Global.LeaderBoardFull, Current Array Element[True]);
		Global.LeaderBoardRemake = Empty Array;
		Global.LeaderBoardHuds = Mapped Array(Global.LeaderBoardFull, First Of(Custom String("　 {0}:　{1} - {2}",
			Current Array Index + True, First Of(Current Array Element), Last Of(Current Array Element))));
		While(Count Of(Global.LeaderBoardHuds));
			Global.LeaderBoardRemake = Custom String("{0}\n{1}", Global.LeaderBoardRemake, First Of(Global.LeaderBoardHuds));
			Modify Global Variable(LeaderBoardHuds, Remove From Array By Index, False);
		End;
		Global.LeaderBoardRemake = Custom String("{0}\n", Global.LeaderBoardRemake);
		"if LeaderBoardFull[0]:"
		Create HUD Text(Local Player.toggle_guide, Null, String("Oof") == Custom String("噢") ? Custom String(" \n{0} 排名前5 {0}",
			Icon String(Flag)) : Custom String(" \n{0} Top 5 {0}", Icon String(Flag)), Null, Right, -141, Null, Color(White), Null,
			Visible To and String, Visible Always);
		Global.LeaderBoardHuds = Last Text ID;
		Create HUD Text(Local Player.toggle_guide, Hero Icon String(Hero(Genji)), First Of(First Of(Global.LeaderBoardFull)), Last Of(
			First Of(Global.LeaderBoardFull)), Right, -140, Color(Red), Color(Red), Color(Red), Visible To, Visible Always);
		Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		If(Global.LeaderBoardFull[True]);
			Create HUD Text(Local Player.toggle_guide, Hero Icon String(Hero(Genji)), First Of(Global.LeaderBoardFull[True]), Last Of(
				Global.LeaderBoardFull[True]), Right, -139, Color(Orange), Color(Orange), Color(Orange), Visible To, Visible Always);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
			If(Global.LeaderBoardFull[2]);
				Create HUD Text(Local Player.toggle_guide, Hero Icon String(Hero(Genji)), First Of(Global.LeaderBoardFull[2]), Last Of(
					Global.LeaderBoardFull[2]), Right, -138, Color(Yellow), Color(Yellow), Color(Yellow), Visible To, Visible Always);
				Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
				If(Global.LeaderBoardFull[3]);
					Create HUD Text(Local Player.toggle_guide, Hero Icon String(Hero(Genji)), First Of(Global.LeaderBoardFull[3]), Last Of(
						Global.LeaderBoardFull[3]), Right, -137, Color(Lime Green), Color(Lime Green), Color(Lime Green), Visible To, Visible Always);
					Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
					If(Global.LeaderBoardFull[4]);
						Create HUD Text(Local Player.toggle_guide, Hero Icon String(Hero(Genji)), First Of(Global.LeaderBoardFull[4]), Last Of(
							Global.LeaderBoardFull[4]), Right, -136, Color(Green), Color(Green), Color(Green), Visible To, Visible Always);
						Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
					End;
				End;
			End;
		End;
		Create HUD Text(Evaluate Once(Global.CompMode && !Global.CompTime) ? True : Local Player.toggle_leaderboard, Custom String(
			"　　　　 {0} {1} {0} 　　　　\n　　　　　　　　　　　　　　　　　　{2}", Icon String(Flag), String("Oof") == Custom String("噢") ? Custom String("成绩排名")
			: Custom String("Leaderboard"), Evaluate Once(Global.LeaderBoardRemake)), Null, Null, Top, -165, Color(White), Null, Null,
			Visible To and String, Default Visibility);
		Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		Global.LeaderBoardRemake = Null;
		Wait(False, Ignore Condition);
	}
}

rule("Huds | Each Player")
{
	event
	{
		Player Joined Match;
		All;
		All;
	}

	actions
	{
		Wait(0.512, Ignore Condition);
		Create HUD Text(Event Player, Null, Event Player.toggle_practice ? Custom String("{0} {1} sec", String("Oof") == Custom String("噢")
			? Custom String("练习用时") : Custom String("Practice Time:"), Event Player.timer_practice) : Empty Array, Custom String(
			"{0} {1} sec                                                                                                ", String("Oof")
			== Custom String("噢") ? Custom String("用时") : Custom String("Time:"), Event Player.timer_normal), Left, -196,
			Global.ColorConfig[3], Color(Gray), Global.ColorConfig[3], String, Default Visibility);
		Create HUD Text(Event Player.toggle_leaderboard ? Null : Event Player, Event Player.preview_array1 ? Custom String(" {0} ({1}/{2}",
			String("Oof") == Custom String("噢") ? (Event Player.preview_i ? (Event Player.preview_i <= Count Of(
			Event Player.cache_bouncePosition) ? Custom String("弹球") : Custom String("自定义传送门")) : Custom String("检查点")) : (
			Event Player.preview_i ? (Event Player.preview_i <= Count Of(Event Player.cache_bouncePosition) ? Custom String("orb")
			: Custom String("portal")) : Custom String("checkpoint")), Event Player.preview_i + True, Custom String(
			"{0})\n―――――――――――\n {1}\n", Count Of(Event Player.preview_array1), Event Player.preview_i <= Count Of(
			Event Player.cache_bouncePosition) && Event Player.preview_i ? Custom String("{0} {1} {2}",
			Global.TQ5[Event Player.preview_array2[Event Player.preview_i]] ? Ability Icon String(Hero(Genji), Button(Ultimate))
			: Empty Array, Global.TQ6[Event Player.preview_array2[Event Player.preview_i]] ? Ability Icon String(Hero(Genji), Button(
			Ability 1)) : Empty Array, Custom String("{0} {1}",
			Global.BounceToggleLock[Event Player.preview_array2[Event Player.preview_i]] ? Icon String(Warning) : Empty Array,
			Global.EditMode[Event Player.preview_array2[Event Player.preview_i]] > Null ? Icon String(Arrow: Up) : (
			Global.EditMode[Event Player.preview_array2[Event Player.preview_i]] < Null ? Icon String(Arrow: Down) : Empty Array))) : (
			Event Player.preview_i ? (String("Oof") == Custom String("噢") ? (Last Of(Event Player.preview_array2[Event Player.preview_i])
			? Custom String("传送门 {0} 出口 ", Event Player.preview_array2[Event Player.preview_i]) : Custom String("传送门 {0} 入口 ",
			Event Player.preview_array2[Event Player.preview_i])) : (Last Of(Event Player.preview_array2[Event Player.preview_i])
			? Custom String("portal {0} destination ", Event Player.preview_array2[Event Player.preview_i]) : Custom String(
			"portal {0} start ", Event Player.preview_array2[Event Player.preview_i]))) : Event Player.banString))) : Empty Array,
			Event Player.preview_array1 ? Empty Array : Custom String("{0}{1} {2}", Event Player.toggle_guide && String Length(
			Event Player.banString) ? Custom String("{0}\n", Event Player.banString) : Empty Array, String("Oof") == Custom String("噢")
			? Custom String("关卡") : Custom String("Level"), Custom String("{0} / {1}", Event Player.checkpoint_current, Count Of(Global.A)
			- True)), Event Player.cache_bounceMaxLocks && !Event Player.preview_array1 ? Custom String("{0}{1} {2}",
			Global.ColorConfig[16], String("Oof") == Custom String("噢") ? Custom String("球") : Custom String(" orbs"), Custom String(
			"{0} / {1}", Count Of(Event Player.cache_collectedLocks), Event Player.cache_bounceMaxLocks)) : Empty Array, Top, -172,
			Global.ColorConfig[4], Global.ColorConfig[4], Global.ColorConfig[16], Visible To and String, Default Visibility);
		Create HUD Text(Event Player, Null, Null, Custom String("{0}{1}{2}", X Component Of(Event Player.cache_inputs) ? Custom String("■")
			: Custom String("□"), Z Component Of(Throttle Of(Event Player)) > Null ? Custom String("▲") : Custom String("△"),
			Custom String("{0}\n{1}{2}", Y Component Of(Event Player.cache_inputs) ? Custom String("●") : Custom String("○"),
			X Component Of(Throttle Of(Event Player)) > Null ? Custom String("◀") : Custom String("◁"), Custom String(
			"{0}{1}                                                                                                ", Z Component Of(
			Throttle Of(Event Player)) < Null ? Custom String("▼") : Custom String("∇"), X Component Of(Throttle Of(Event Player))
			< Null ? Custom String("▶") : Custom String("▷")))), Left, -192, Null, Null, Evaluate Once(Global.ColorConfig[3]), String,
			Default Visibility);
		"climb/bhop indicators"
		Create HUD Text(Event Player, String("Oof") == Custom String("噢") ? Custom String("{0}{1}",
			Event Player.skill_usedClimb ? Custom String("爬墙已用") : Custom String("爬墙未用"), Event Player.skill_countMulti ? Custom String(
			" ({0})", Event Player.skill_countMulti) : Empty Array) : Custom String("Climb{0}",
			Event Player.skill_countMulti ? Custom String(" ({0})", Event Player.skill_countMulti) : Empty Array), Null, Custom String(
			"                                                                                                                                "),
			Left, -193, Event Player.skill_usedClimb ? Evaluate Once(Global.ColorConfig[8]) : Evaluate Once(Global.ColorConfig[7]), Null,
			Null, String and Color, Default Visibility);
		Create HUD Text(Event Player, String("Oof") == Custom String("噢") ? Custom String("{0}{1}",
			Event Player.skill_usedBhop ? Custom String("小跳已用") : Custom String("小跳未用"), Event Player.skill_countCreates ? Custom String(
			" ({0})", Event Player.skill_countCreates) : Empty Array) : Custom String("Bhop{0}",
			Event Player.skill_countCreates ? Custom String(" ({0})", Event Player.skill_countCreates) : Empty Array), Null, Custom String(
			"                                                                                                                                "),
			Left, -194, Event Player.skill_usedBhop ? Evaluate Once(Global.ColorConfig[8]) : Evaluate Once(Global.ColorConfig[7]), Null,
			Null, String and Color, Default Visibility);
		Create In-World Text(Event Player.checkpoint_notLast && Event Player.toggle_guide ? Event Player : Null,
			Event Player.cache_bounceMaxLocks && Count Of(Event Player.cache_collectedLocks)
			< Event Player.cache_bounceMaxLocks ? Custom String("{0} {1}", Icon String(Warning), String("Oof") == Custom String("噢")
			? Custom String("先收集橙球") : Custom String("collect orbs first")) : (String("Oof") == Custom String("噢") ? Custom String("到这里来")
			: Custom String("come here")), Global.A[Event Player.checkpoint_current + True], 1.500, Do Not Clip,
			Visible To Position and String, Global.ColorConfig[13], Default Visibility);
		Wait(2.500, Ignore Condition);
		If(Global.CompMode);
			Create HUD Text(Event Player, Null, String("Oof") == Custom String("噢") ? (Global.CompTime ? Custom String("剩余时间: {0} 分钟{1}",
				Global.CompTime, Event Player.comp_countAttempts < Null ? Custom String("\n你没有尝试过") : (Global.CompAtmpNum ? Custom String(
				"\n尝试 {0} / {1}", Event Player.comp_countAttempts, Global.CompAtmpNum) : Empty Array)) : Custom String("! 比赛结束 !")) : (
				Global.CompTime ? Custom String("time left: {0} min{1}", Global.CompTime,
				Event Player.comp_countAttempts < Null ? Custom String("\nYou are out of attempts") : (Global.CompAtmpNum ? Custom String(
				"\nAttempt {0} / {1}", Event Player.comp_countAttempts, Global.CompAtmpNum) : Empty Array)) : Custom String(
				"! competition is over !")), String("Oof") == Custom String("噢") ? (Global.CompTime ? Custom String("竞赛模式") : Custom String(
				"竞赛模式\n\n\n")) : (Global.CompTime ? Custom String("competitive mode") : Custom String("competitive mode\n\n\n")), Top, -182,
				Color(Yellow), Color(Yellow), Color(Yellow), String, Default Visibility);
	}
}

rule("Huds | SUB Update Title")
{
	event
	{
		Subroutine;
		UpdateTitle;
	}

	actions
	{
		Abort If(Global.CompMode || Event Player.editor_on || !(Count Of(Global.TitleData) && Array Contains(First Of(Global.TitleData),
			Event Player.checkpoint_current)) || Event Player.toggle_practice);
		Destroy In-World Text(Event Player.cache_titleHud);
		Create In-World Text(First Of(!Event Player.toggle_invisible), Global.TitleData[True][Index Of Array Value(First Of(
			Global.TitleData), Event Player.checkpoint_current)], Event Player, 1.100, Clip Against Surfaces, Visible To and Position,
			Last Of(Global.TitleData)[Index Of Array Value(First Of(Global.TitleData), Event Player.checkpoint_current)],
			Default Visibility);
		Event Player.cache_titleHud = Last Text ID;
	}
}

rule("Huds | Addons")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Wait Until(Number Of Players(All Teams) > Null, 999999995904.000);
		Wait(False, Ignore Condition);
		If(All Players(All Teams).addon_toggle3rdPov <= True);
			Create HUD Text(Local Player.toggle_guide, Null, Null, String("Oof") == Custom String("噢") ? Custom String(
				"长按 {0} + {1} | 第三人称{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Jump)),
				Local Player.addon_toggle3rdPov ? Custom String(" | 启用") : Empty Array) : Custom String("Hold {0} + {1} | 3rd Person{2}",
				Input Binding String(Button(Crouch)), Input Binding String(Button(Jump)), Local Player.addon_toggle3rdPov ? Custom String(
				" | ON") : Empty Array), Right, -159, Null, Null, Local Player.addon_toggle3rdPov ? Evaluate Once(Global.ColorConfig[6])
				: Evaluate Once(Global.ColorConfig[5]), Visible To String and Color, Default Visibility);
	}
}

rule("<tx0C00000000001344> Effects <tx0C00000000001344>")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Effects | Setup Effects")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"add back to below wait if removed"
		Wait(1.264, Ignore Condition);
		"pre set control map portals. not in portal rule because shared I variable"
		If(Count Of(Global.PortalDest));
			For Global Variable(NANBA, 0, Count Of(Global.PortalLoc), True);
				Create Effect(Filtered Array(All Players(All Teams),
					Current Array Element.toggle_invincible || !Current Array Element.checkpoint_notLast), Bad Aura, Global.NANBA % 2 ? Color(Aqua)
					: Color(Orange), Global.PortalLoc[Global.NANBA], 0.600, Visible To);
				Create In-World Text(Filtered Array(All Players(All Teams),
					Current Array Element.toggle_invincible || !Current Array Element.checkpoint_notLast), Global.PortalNames[Global.NANBA],
					Global.PortalLoc[Global.NANBA] + Up, True, Clip Against Surfaces, Visible To, Color(White), Default Visibility);
			End;
		End;
		Wait Until(Entity Exists(Filtered Array(All Players(All Teams), !Is Dummy Bot(Current Array Element))), 999999995904.000);
		Wait(False, Ignore Condition);
		If(First Of(Filtered Array(All Players(All Teams), !Is Dummy Bot(Current Array Element))).editor_on);
			Call Subroutine(RebuildKillOrbs);
			Call Subroutine(RebuildBounceOrbs);
			Call Subroutine(RebuildPortals);
		Else;
			Call Subroutine(EffectsCreate);
	}
}

rule("Effects | SUB Create Object Effects")
{
	event
	{
		Subroutine;
		EffectsCreate;
	}

	actions
	{
		If(Count Of(Global.CustomPortalStart));
			For Global Variable(NANBA, 0, Count Of(Global.CustomPortalStart), True);
				Create Effect(Filtered Array(All Players(All Teams), Current Array Element.checkpoint_current == Evaluate Once(
					Global.CustomPortalCP[Global.NANBA]) || Evaluate Once(Global.CustomPortalCP[Global.NANBA] < Null)), Good Aura,
					Global.ColorConfig[17], Global.CustomPortalStart[Global.NANBA], 0.600, Visible To);
				Wait(False, Ignore Condition);
			End;
			Wait(0.500, Ignore Condition);
		End;
		If(Count Of(Global.H));
			For Global Variable(NANBA, 0, Count Of(Global.H), True);
				Create Effect(Filtered Array(All Players(All Teams), Current Array Element.checkpoint_current == Evaluate Once(
					Global.killballnumber[Global.NANBA])), Sphere, Global.ColorConfig[14], Global.H[Global.NANBA], Absolute Value(
					Global.I[Global.NANBA]), Visible To);
				Wait(False, Ignore Condition);
			End;
			Wait(0.500, Ignore Condition);
		End;
		If(Count Of(Global.TQ));
			For Global Variable(NANBA, 0, Count Of(Global.TQ), True);
				Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
					Current Array Element.checkpoint_current == Evaluate Once(Global.pinballnumber[Global.NANBA]) && !Array Contains(
					Current Array Element.cache_collectedLocks, Evaluate Once(Global.NANBA))), Orb,
					Global.BounceToggleLock[Global.NANBA] ? Global.ColorConfig[16] : Global.ColorConfig[15], Global.TQ[Global.NANBA], True,
					Visible To);
				Wait(False, Ignore Condition);
			End;
		End;
		"End portal preview"
		Create Effect(Local Player.preview_i && Local Player.preview_i > Count Of(Local Player.cache_bouncePosition) && Last Of(
			Local Player.preview_array2[Local Player.preview_i]) ? Local Player : Null, Sparkles, Color(Purple),
			Local Player.preview_array1[Local Player.preview_i], 0.500, Visible To Position and Radius);
	}
}

rule("Effects | SUB Rebuild Bounce Orbs")
{
	event
	{
		Subroutine;
		RebuildBounceOrbs;
	}

	actions
	{
		Destroy Effect(Global.TQ2);
		Global.TQ2 = Empty Array;
		For Global Variable(NANBA, 0, Count Of(Global.pinballnumber), True);
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.checkpoint_current == Global.pinballnumber[Evaluate Once(Global.NANBA)] && !Array Contains(
				Current Array Element.cache_collectedLocks, Evaluate Once(Global.NANBA))), Orb, Global.BounceToggleLock[Evaluate Once(
				Global.NANBA)] ? Global.ColorConfig[16] : Global.ColorConfig[15], Global.TQ[Evaluate Once(Global.NANBA)], True,
				Visible To Position Radius and Color);
			Modify Global Variable(TQ2, Append To Array, Last Created Entity);
			"wait()"
			If(!(Global.NANBA % 5));
				Wait(False, Ignore Condition);
			End;
		End;
	}
}

rule("Effects | SUB Rebuild boundary spheres")
{
	event
	{
		Subroutine;
		RebuildKillOrbs;
	}

	actions
	{
		Destroy Effect(Global.K);
		Global.K = Empty Array;
		For Global Variable(NANBA, 0, Count Of(Global.killballnumber), True);
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.checkpoint_current == Global.killballnumber[Evaluate Once(Global.NANBA)]), Sphere,
				Global.ColorConfig[14], Global.H[Evaluate Once(Global.NANBA)], Absolute Value(Global.I[Evaluate Once(Global.NANBA)]),
				Visible To Position and Radius);
			Modify Global Variable(K, Append To Array, Last Created Entity);
			If(!(Global.NANBA % 5));
				Wait(False, Ignore Condition);
			End;
		End;
	}
}

rule("Effects | SUB Rebuild Portals")
{
	event
	{
		Subroutine;
		RebuildPortals;
	}

	actions
	{
		Destroy Effect(Global.PortalEffects);
		Global.PortalEffects = Empty Array;
		If(Count Of(Global.CustomPortalCP));
			For Global Variable(NANBA, 0, Count Of(Global.CustomPortalCP), True);
				Create Effect(Filtered Array(All Players(All Teams),
					Current Array Element.checkpoint_current == Global.CustomPortalCP[Evaluate Once(Global.NANBA)
					] || Global.CustomPortalCP[Evaluate Once(Global.NANBA)] < Null), Good Aura, Global.ColorConfig[17],
					Global.CustomPortalStart[Evaluate Once(Global.NANBA)], 0.600, Visible To Position and Radius);
				Modify Global Variable(PortalEffects, Append To Array, Last Created Entity);
				If(!(Global.NANBA % 5));
					Wait(False, Ignore Condition);
				End;
			End;
		End;
	}
}

rule("<tx0C00000000001344> Mechanics | Checks <tx0C00000000001344>")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Mechanic | SUB Check Ultimate")
{
	event
	{
		Subroutine;
		CheckUlt;
	}

	actions
	{
		If(Event Player.lockState);
			"for dash start etc you can be away from cp so the keep charge triggers"
			Set Ultimate Charge(Event Player, False);
		End;
		"make sure the button cant be pressed until the entire rule ends even if it restarts"
		Disallow Button(Event Player, Button(Ultimate));
		"if eventPlayer.ult_cd_global > 0: # global cooldown construction that works even when rule is reset"
		If(Event Player.skill_ultCd > Total Time Elapsed);
			"waitUntil(not eventPlayer.ult_cd_global, true)"
			Wait(Event Player.skill_ultCd - Total Time Elapsed, Ignore Condition);
		Else;
			"eventPlayer.ult_cd_global = 1 # this number doesnt matter because its a duration chase\nchase(eventPlayer.ult_cd_global, 0, duration=0.36, ChaseReeval.NONE) # duration = the cooldown"
			Event Player.skill_ultCd = Total Time Elapsed + 0.360;
		End;
		If(Is Using Ultimate(Event Player));
			Wait Until(!Is Using Ultimate(Event Player), 2);
			Wait(False, Ignore Condition);
		End;
		"incase spamming the button"
		If(Is Button Held(Event Player, Button(Ultimate)));
			Wait(False, Ignore Condition);
		End;
		If(Event Player.toggle_invincible || (Event Player == Host Player && Event Player.editor_on) || !Event Player.checkpoint_notLast);
			"skip msg if these"
			Skip(2);
		Else If(Array Contains(Global.Dao, Event Player.checkpoint_current) && Distance Between(Event Player, Last Of(
				Global.A[Event Player.checkpoint_current])) <= 1.400);
			Small Message(Event Player, Custom String("   {0} {1} ", Ability Icon String(Hero(Genji), Button(Ultimate)), String("Oof")
				== Custom String("噢") ? Custom String("终极技能已就绪") : Custom String("Ultimate is ready")));
			Wait(False, Ignore Condition);
			Set Ultimate Ability Enabled(Event Player, True);
			Set Ultimate Charge(Event Player, 100);
		"used to be just else, but have to deal with multi ult orbs"
		Else If(Distance Between(Event Player, Last Of(Global.A[Event Player.checkpoint_current])) <= 2 || Ultimate Charge Percent(
				Event Player) < 100);
			Set Ultimate Ability Enabled(Event Player, False);
			Set Ultimate Charge(Event Player, False);
		End;
		Allow Button(Event Player, Button(Ultimate));
	}
}

rule("Mechanic | SUB Check Dash")
{
	event
	{
		Subroutine;
		CheckDash;
	}

	actions
	{
		Wait Until(!Is Using Ability 1(Event Player), True);
		If(Event Player.toggle_invincible || (Event Player == Host Player && Event Player.editor_on) || !Event Player.checkpoint_notLast);
			"skip msg if these"
			Skip(2);
		Else If(Array Contains(Global.SHIFT, Event Player.checkpoint_current) && Distance Between(Event Player, Last Of(
				Global.A[Event Player.checkpoint_current])) <= 1.400);
			Small Message(Event Player, Custom String("   {0} {1}", Ability Icon String(Hero(Genji), Button(Ability 1)), String("Oof")
				== Custom String("噢") ? Custom String("技能1影已就绪") : Custom String("Dash is ready")));
			Wait(False, Ignore Condition);
			Set Ability 1 Enabled(Event Player, True);
		Else;
			Set Ability 1 Enabled(Event Player, False);
		End;
	}
}

rule("Mechanic | Ultimate")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Using Ultimate(Event Player) == True;
	}

	actions
	{
		Wait(1.800, Abort When False);
		If(Event Player.checkpoint_notLast && !Event Player.toggle_invincible);
			"disable primary fire because of slash exploit"
			Disallow Button(Event Player, Button(Primary Fire));
		End;
		Wait Until(!Is Using Ultimate(Event Player), 2);
		Wait(False, Ignore Condition);
		Allow Button(Event Player, Button(Primary Fire));
		"sets ult charge back if done with map etc"
		Start Rule(CheckUlt, Restart Rule);
	}
}

rule("Mechanic | Dash")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Using Ability 1(Event Player) == True;
	}

	actions
	{
		Start Rule(CheckDash, Restart Rule);
	}
}

rule("Mechanic | Jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Jump)) == True;
		Event Player.skill_countJumps != 2;
	}

	actions
	{
		Event Player.skill_countJumps += True;
	}
}

rule("Mechanic | In the air")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.skill_countJumps == Null;
		Is In Air(Event Player) == True;
	}

	actions
	{
		Event Player.skill_countJumps = 1;
	}
}

rule("Mechanic | Triple jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.skill_countJumps == 1;
	}

	actions
	{
		"actually just checks if you been in the air for at least 0.1 seconds"
		Wait(0.100, Abort When False);
		Event Player.skill_countJumps = 2;
	}
}

rule("Mechanic | Player on the wall")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		"This rule is also linked to the determination of wall climbing, please do not close/delete"
		Is On Wall(Event Player) == True;
		Is Button Held(Event Player, Button(Jump)) == True;
	}

	actions
	{
		Event Player.skill_countJumps = 2;
		Event Player.skill_usedClimb = True;
	}
}

rule("Mechanic | Using Emote")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Communicating Any Emote(Event Player) == True;
	}

	actions
	{
		Event Player.skill_usedBhop = False;
		If(Event Player.addon_toggle3rdPov);
			Event Player.addon_toggle3rdPov = False;
			Stop Camera(Event Player);
		End;
		If(Event Player.ban_emote);
			Wait Until(!Is Communicating Any Emote(Event Player), 999999995904.000);
			Abort If(Event Player.toggle_invincible);
			Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   表情留小 ♥ 已禁用!") : Custom String(
				"   Emote Savehop ♥ is banned!"));
			Wait(False, Ignore Condition);
			Call Subroutine(CheckpointFailReset);
	}
}

rule("Mechanic | Bhop")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.skill_usedBhop == False;
		Is Jumping(Event Player) == True;
	}

	actions
	{
		Event Player.skill_usedBhop = True;
		If(Event Player.skill_countJumps > 1);
			Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   小跳已用") : Custom String("   Bhop"));
	}
}

rule("Mechanic | Bhop count for stand ban")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Jumping(Event Player) == True;
		Event Player.ban_standcreate != False;
	}

	actions
	{
		Event Player.skill_countBhops += True;
		If(Event Player.skill_countBhops > 1 && !Event Player.toggle_invincible);
			Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   站卡 ♠ 已禁用!") : Custom String(
				"   Stand createBhop ♠ is banned!"));
			Call Subroutine(CheckpointFailReset);
			Abort;
	}
}

rule("Mechanic | Create Bhop")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Crouch)) == True;
		Is Crouching(Event Player) == True;
		Is In Air(Event Player) == True;
		Is Button Held(Event Player, Button(Jump)) == False;
		Is Jumping(Event Player) == False;
	}

	actions
	{
		Event Player.skill_usedBhop = False;
		"prevent restart from giving messsage, but stil allow it to become green"
		Abort If(Event Player.lockState);
		If(Event Player.ban_create && !Event Player.toggle_invincible);
			Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   卡小 ♂ 已禁用!") : Custom String(
				"   Create Bhop ♂ is banned!"));
			Call Subroutine(CheckpointFailReset);
			Abort;
		End;
		If(Event Player.ban_standcreate && Event Player.skill_countBhops > Null);
			Event Player.skill_countBhops -= True;
		End;
		Event Player.skill_countCreates += True;
		Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   success!") : Custom String(
			"   Bhop has been created!"));
	}
}

rule("Mechanic | Ground Reset")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is On Ground(Event Player) == True;
	}

	actions
	{
		Event Player.skill_countJumps = Null;
		Event Player.skill_usedClimb = False;
		Event Player.skill_countMulti = Null;
		Event Player.skill_countCreates = Null;
		Event Player.skill_countBhops = Null;
		Event Player.skill_usedDouble = Null;
		Wait(False, Ignore Condition);
		Loop If((Event Player.skill_countJumps || Event Player.skill_usedClimb) && Is On Ground(Event Player));
	}
}

rule("Mechanic | Bhop Reset")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is On Ground(Event Player) == True;
		Is Button Held(Event Player, Button(Jump)) == False;
	}

	actions
	{
		Event Player.skill_usedBhop = False;
	}
}

rule("Mechanic | Double Jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		Is Alive(Event Player) == True;
		Is On Ground(Event Player) == False;
		(Event Player.ban_djump || Event Player.ban_savedouble || Event Player.addon_enableDoubleChecks) == True;
	}

	actions
	{
		"Save drop"
		Wait Until(Is On Ground(Event Player) || Is Jumping(Event Player) || Is Button Held(Event Player, Button(Jump)), 0.096);
		Abort If Condition Is False;
		While(True);
			"Released Jump"
			Wait Until(Is On Ground(Event Player) || !Is Button Held(Event Player, Button(Jump)), 999999995904.000);
			Abort If Condition Is False;
			"Double Jumped"
			Wait Until(Is On Ground(Event Player) || Is Button Held(Event Player, Button(Jump)), 999999995904.000);
			Abort If Condition Is False;
			Event Player.skill_usedDouble = True;
			"Reset"
			Wait Until(Is On Ground(Event Player) || !Event Player.skill_usedDouble, 999999995904.000);
			Abort If Condition Is False;
		End;
	}
}

rule("Mechanic | Multiclimb")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is On Wall(Event Player) == True;
		Is Button Held(Event Player, Button(Jump)) == False;
		Event Player.skill_usedClimb == False;
	}

	actions
	{
		Wait(False, Ignore Condition);
		If(Is On Wall(Event Player) && !Is Button Held(Event Player, Button(Jump)));
			Event Player.skill_countJumps = 2;
			Event Player.skill_usedClimb = True;
		Else;
			If(Event Player.ban_multi && Event Player.checkpoint_notLast && !Event Player.toggle_invincible);
				Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("    蹭留 ∞ 已禁用!") : Custom String(
					"   Multiclimb ∞ is banned!"));
				Call Subroutine(CheckpointFailReset);
			Else;
				Event Player.skill_countMulti += True;
	}
}

rule("Mechanic | Ban Wallclimb - Message")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.ban_climb != False;
		Event Player.toggle_invincible == False;
		Event Player.skill_usedClimb != False;
	}

	actions
	{
		"CheckpointFailReset()\neventPlayer.setStatusEffect(null,Status.BURNING, 0.1)"
		Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   爬墙 ↑ 已禁用!") : Custom String(
			"   Climb ↑ is banned!"));
	}
}

rule("Mechanic | Ban Save Double - 封禁二段跳")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		Event Player.ban_savedouble != False;
		Event Player.toggle_invincible == False;
		Is On Ground(Event Player) == False;
		Event Player.skill_usedDouble == False;
		Is Button Held(Event Player, Button(Jump)) == True;
	}

	actions
	{
		Wait Until(Z Component Of(Throttle Of(Event Player)) > Null || Is On Ground(Event Player) || !Is Button Held(Event Player, Button(
			Jump)), 999999995904.000);
		Abort If Condition Is False;
		Wait Until(Z Component Of(Throttle Of(Event Player)) <= Null || Is On Ground(Event Player) || !Is Button Held(Event Player, Button(
			Jump)), 999999995904.000);
		Abort If Condition Is False;
		"Prevent false positives\nDefault climb speed is 7.8 and small slowdown upon mantling"
		Loop If(Vertical Speed Of(Event Player) < 6);
		If(Event Player.skill_usedBhop);
			Wait(0.800, Abort When False);
		Else;
			Wait(0.800, Abort When False);
			Abort If(Event Player.skill_usedBhop);
		End;
		Small Message(Event Player, String("Oof") == Custom String("噢") ? Custom String("   延二段跳已禁用!") : Custom String(
			"   save double banned!"));
		Call Subroutine(CheckpointFailReset);
	}
}

rule("<tx0C00000000001344> Addon Functions <tx0C00000000001344>")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Addon | AFK timer")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Moving(Event Player) == False;
		Is Alive(Event Player) == True;
		Is Communicating Any Emote(Event Player) == False;
		Event Player.editor_on == False;
	}

	actions
	{
		Wait(300, Abort When False);
		If(Event Player.addon_toggle3rdPov);
			Event Player.addon_toggle3rdPov = False;
		End;
		Set Status(Event Player, Null, Asleep, 999999995904.000);
		"raycast to prevent camera stuck on low wall"
		Start Camera(Event Player, Position Of(Event Player) + Up * (Distance Between(Position Of(Event Player), Ray Cast Hit Position(
			Position Of(Event Player), Position Of(Event Player) + 4 * Up, Null, Null, False)) - True), Position Of(Event Player), 10);
		"cancel it after jumping or not sleep, reset cures sleep"
		Wait(True, Ignore Condition);
		Wait Until(Is Button Held(Event Player, Button(Jump)) || !Has Status(Event Player, Asleep), 999999995904.000);
		Clear Status(Event Player, Asleep);
		Stop Camera(Event Player);
		If(Event Player.checkpoint_notLast && !Event Player.toggle_invincible);
			Call Subroutine(CheckpointFailReset);
		End;
		Loop If Condition Is True;
	}
}

rule("Addon | Pre-set control map portal - toggled via workshop")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Global.PortalOn != False;
		Count Of(Global.PortalLoc) != Null;
		(Event Player.toggle_invincible || !Event Player.checkpoint_notLast) == True;
		Is True For Any(Global.PortalLoc, Distance Between(Current Array Element, Position Of(Event Player) + 0.200 * Up) < 1.300) == True;
	}

	actions
	{
		Teleport(Event Player, First Of(Sorted Array(Global.PortalDest, Distance Between(Event Player,
			Global.PortalLoc[Current Array Index]))));
	}
}

rule("Addon | Custom portals")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Count Of(Event Player.cache_portalStart) != Null;
		Is True For Any(Event Player.cache_portalStart, Distance Between(Current Array Element, Position Of(Event Player) + 0.200 * Up)
			< 1.300) == True;
	}

	actions
	{
		Teleport(Event Player, First Of(Sorted Array(Event Player.cache_portalEnd, Distance Between(Event Player,
			Event Player.cache_portalStart[Current Array Index]))));
		Wait(0.400, Ignore Condition);
	}
}

rule("Addon | Pre-set control map portal - toggled on via workshop settings")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Global.PortalOn != False;
	}

	actions
	{
		"overwrite pasta"
		Wait(0.752, Ignore Condition);
		If(Current Map == Map(Busan));
			"\"down > sanc\",\"down > meka\",\"sanc > down\",\"sanc > meka\",\"meka > sanc\",\"meka > down\""
			Global.PortalNames = Array(Custom String("Sanctuary"), Custom String("MEKA base"), Custom String("Downtown"), Custom String(
				"MEKA base"), Custom String("Sanctuary"), Custom String("Downtown"));
			Global.PortalLoc = Array(Vector(47.946, 7.248, -93.922), Vector(55.921, 6.998, -94.024), Vector(-326.382, 10.810, 117.261), Vector(
				-330.960, 10.810, 117.416), Vector(219.567, 10.215, 243.653), Vector(225.976, 10.227, 240.799));
			Global.PortalDest = Array(Vector(-328.552, 10.010, 120.820), Vector(221.152, 9.376, 238.765), Vector(52.197, 6.301, -97.513),
				Vector(221.271, 9.431, 238.978), Vector(-328.601, 10.010, 120.823), Vector(52.197, 6.299, -97.513));
		Else If(Current Map == Map(Ilios));
			"\"light > ruin\",\"light > well\",\"ruin > light\",\"ruin > well\",\"well > light\",\"well > ruin\""
			Global.PortalNames = Array(Custom String("Ruins"), Custom String("Well"), Custom String("Lighthouse"), Custom String("Well"),
				Custom String("Lighthouse"), Custom String("Ruins"));
			Global.PortalLoc = Array(Vector(325.722, -22.665, -40.401), Vector(327.430, -22.665, -36.089), Vector(26.176, 58.367, -156.415),
				Vector(30.472, 58.367, -156.307), Vector(-199.945, 2.015, -2.918), Vector(-194.930, 2.015, -8.054));
			Global.PortalDest = Array(Vector(28.375, 57.659, -161.195), Vector(-200.464, 1.306, -8.604), Vector(333.088, -23.389, -40.933),
				Vector(-200.464, 1.306, -8.604), Vector(333.088, -23.389, -40.933), Vector(28.375, 57.829, -161.195));
		Else If(Current Map == Map(Lijiang Tower) || Current Map == Map(Lijiang Tower Lunar New Year));
			"\"control > garden\",\"control > market\",\"garden > control\",\"garden > market\",\"market > control\",\"market > garden\""
			Global.PortalNames = Array(Custom String("Garden"), Custom String("Night Market"), Custom String("Control Center"), Custom String(
				"Night Market"), Custom String("Control Center"), Custom String("Garden"));
			Global.PortalLoc = Array(Vector(-2.815, 271, 295.373), Vector(2.905, 271, 295.052), Vector(5.788, 95.056, 135.298), Vector(-5.343,
				95.050, 134.638), Vector(-2.738, False, -61.911), Vector(5.043, False, -61.879));
			Global.PortalDest = Array(Vector(0.286, 94.292, 140.396), Vector(0.584, -0.709, -54.469), Vector(0.245, 270.292, 301.428), Vector(
				0.773, -0.708, -54.361), Vector(0.245, 270.292, 301.428), Vector(0.286, 94.292, 140.396));
		Else If(Current Map == Map(Nepal));
			"\"vil > shrine\",\"vil > sanc\", \"shrine > vil\",\"shrine > sanc\",#\"sanc > vil\",\"sanc > shrine\""
			Global.PortalNames = Array(Custom String("Shrine"), Custom String("Sanctum"), Custom String("Village"), Custom String("Sanctum"),
				Custom String("Village"), Custom String("Shrine"));
			Global.PortalLoc = Array(Vector(-194.732, -92.860, -3.802), Vector(-194.585, -92.860, 4.187), Vector(-33.165, 14, 5.212), Vector(
				-33.058, 14, -5.550), Vector(84.750, 129.008, -3.624), Vector(84.534, 129, 4.032));
			Global.PortalDest = Array(Vector(-40.190, 13.292, -0.105), Vector(78.430, 128.292, 0.149), Vector(-190.540, -93.569, 0.122),
				Vector(78.430, 128.292, 0.149), Vector(-190.540, -93.569, 0.122), Vector(-40.190, 13.292, -0.105));
		Else If(Current Map == Map(Oasis));
			"\"uni > garden\",\"uni > city\",\"garden > uni\",\"garden > city\",\"city > garden\",\"city > uni\""
			Global.PortalNames = Array(Custom String("Gardens"), Custom String("City Center"), Custom String("University"), Custom String(
				"City Center"), Custom String("Gardens"), Custom String("University"));
			Global.PortalLoc = Array(Vector(-211.137, 20, -5.084), Vector(-211.346, 20, 5.029), Vector(143.061, 8.377, -245.040), Vector(
				139.333, 8.377, -249.964), Vector(157.297, 12.522, 255.759), Vector(151.452, 12.522, 261.099));
			Global.PortalDest = Array(Vector(134.366, 7.829, -240.530), Vector(158.270, 11.814, 262.272), Vector(-206.269, 19.292, 0.103),
				Vector(158.283, 11.814, 262.283), Vector(134.318, 7.829, -240.667), Vector(-206.269, 19.292, 0.103));
		Else If(Current Map == Map(Antarctic Peninsula));
			Global.PortalNames = Array(Custom String("labs"), Custom String("icebreaker"), Custom String("Sublevel"), Custom String(
				"icebreaker"), Custom String("labs"), Custom String("Sublevel"));
			Global.PortalLoc = Array(Vector(280.660, -12.150, -223.650), Vector(273.270, 42.740, 198.150), Vector(266.580, 42.740, 198.170),
				Vector(-58.290, -154, 63.030), Vector(-58.360, -154, 56.470), Vector(287.080, -12.150, -223.590));
			Global.PortalDest = Array(Vector(270, 42.700, 190.440), Vector(284.070, -12.750, -216.150), Vector(-53.510, -154.500, 60.080),
				Vector(284.070, -12.750, -216.150), Vector(270, 42.700, 190.440), Vector(-53.510, -154.500, 60.080));
		Else If(Current Map == Map(Samoa));
			Global.PortalNames = Array(Custom String("beach"), Custom String("volcano"), Custom String("downtown"), Custom String("volcano"),
				Custom String("beach"), Custom String("downtown"));
			Global.PortalLoc = Array(Vector(231.980, 7.230, -262.840), Vector(236.780, 7.230, -262.750), Vector(-327.590, 3.600, -108.690),
				Vector(-332.710, 3.600, -108.590), Vector(25.400, 341, 354.380), Vector(30, 341, 354.340));
			Global.PortalDest = Array(Vector(-329.860, 3.050, -103.400), Vector(27.590, 339.760, 348.770), Vector(234.070, 6.120, -266.880),
				Vector(27.590, 339.760, 348.770), Vector(-329.860, 3.050, -103.400), Vector(234.070, 6.120, -266.880));
	}
}

rule("Addon | Little destructo - fence breaker")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"Made by FishoFire version 1.0\nwait to overwrite any from copy pastas"
		Wait(0.032, Ignore Condition);
		"first entry will act as index, rest is the points themselves"
		Global.MapVectorArray = Array(Null);
		"tdm/dm = first spawn points, the maps are not big so it just covers entire map. all teams defaults to team 1 spawn\npush: payload and cp 0 are set but rest isnt. normal payload maps have more then 1 point.\nrest of maps have up to 3 points"
		Modify Global Variable(MapVectorArray, Append To Array, Current Game Mode == Game Mode(Capture the Flag) ? Array(Flag Position(
			Team 1), Flag Position(Team 2)) : (Array Contains(Array(Game Mode(Team Deathmatch), Game Mode(Deathmatch)), Current Game Mode)
			? First Of(Spawn Points(All Teams)) : (First Of(Payload Position) && !(Objective Position(True) + Objective Position(2))
			? Payload Position : Array(Objective Position(False), Objective Position(True), Objective Position(2)))));
		"explode in a grid around the selected points"
		While(Count Of(Global.MapVectorArray) > 1);
			Global.MapVectorArray[False] = Null;
			While(First Of(Global.MapVectorArray) < 256);
				Create Projectile(Orb Projectile, Null, Global.MapVectorArray[True] - Vector(240, False, 240) + First Of(Global.MapVectorArray)
					% 16 * Left * 30 + Round To Integer(First Of(Global.MapVectorArray) / 16, Down) * Forward * 30, Down, To World, Heal, Team 1,
					0, 0, 30, Good Explosion, Explosion Sound, 1, 1, 0, 0, 0, 0);
				Global.MapVectorArray[False] += True;
				"use modulo to only wait every x orbs keep the 0 change the other number"
				If(!(First Of(Global.MapVectorArray) % 3));
					Wait(False, Ignore Condition);
				End;
			End;
			Modify Global Variable(MapVectorArray, Remove From Array By Index, True);
		End;
		"handle exceptions (looking at you new queen street)"
		Global.MapVectorArray = Array(Vector(8.276, 4.113, 15.261), Vector(-8.319, 2.624, 14.245), Vector(0.006, 4.821, 18.513));
		While(Count Of(Global.MapVectorArray));
			"same as other projectile before"
			Create Projectile(Orb Projectile, Null, First Of(Global.MapVectorArray), Down, To World, Heal, Team 1, 0, 0, 30, Good Explosion,
				Explosion Sound, 1, 1, 0, 0, 0, 0);
			Modify Global Variable(MapVectorArray, Remove From Array By Index, False);
			Wait(False, Ignore Condition);
		End;
		Global.MapVectorArray = Null;
	}
}

rule("Addon | Cache jump & crouch inputs for spectators")
{
	event
	{
		Player Joined Match;
		All;
		All;
	}

	actions
	{
		Wait(False, Ignore Condition);
		Event Player.cache_inputs = Vector(Is Button Held(Event Player, Button(Jump)), Is Button Held(Event Player, Button(Crouch)),
			False);
		Loop;
	}
}

rule("Addon | SUB Basic Map Validator")
{
	event
	{
		Subroutine;
		AddonCheckMap;
	}

	actions
	{
		Abort If(Count Of(Global.A) <= 1);
		Create Dummy Bot(Hero(Ana), Number Of Slots(Team 1) < Number Of Slots(Team 2) ? Team 1 : Team 2, -1, First Of(Global.A), Null);
		Global.MsDestructo = Last Created Entity;
		Disable Movement Collision With Environment(Global.MsDestructo, False);
		Disable Movement Collision With Players(Global.MsDestructo);
		Set Status(Global.MsDestructo, Null, Phased Out, 999999995904.000);
		Set Invisible(Global.MsDestructo, All);
		Start Scaling Player(Global.MsDestructo, 3.111, False);
		Set Gravity(Global.MsDestructo, 999999995904.000);
		Wait Until(Has Spawned(Global.MsDestructo), 999999995904.000);
		For Player Variable(Global.MsDestructo, checkpoint_current, 1, Count Of(Global.A), True);
			If(First Of(Nearest Walkable Position(Global.A[Global.MsDestructo.checkpoint_current])) && Distance Between(
				Global.A[Global.MsDestructo.checkpoint_current], Nearest Walkable Position(Global.A[Global.MsDestructo.checkpoint_current]))
				> 1.400);
				Start Forcing Player Position(Global.MsDestructo, Ray Cast Hit Position(
					Global.A[Global.MsDestructo.checkpoint_current] + Up * 1.400, Global.A[Global.MsDestructo.checkpoint_current] + Down * 1.400,
					Empty Array, Empty Array, False), True);
				Wait(0.112, Ignore Condition);
				Stop Forcing Player Position(Global.MsDestructo);
				Wait Until(Is On Ground(Global.MsDestructo), True);
				Skip If(Is On Ground(Global.MsDestructo) && Distance Between(Global.MsDestructo, Global.A[Global.MsDestructo.checkpoint_current])
					<= 1.400, 11);
				For Player Variable(Global.MsDestructo, checkpoint_practice, 1.400, 1.200, -0.200);
					Start Forcing Player Position(Global.MsDestructo,
						Global.A[Global.MsDestructo.checkpoint_current] + Up * Global.MsDestructo.checkpoint_practice, True);
					Wait(0.112, Ignore Condition);
					Stop Forcing Player Position(Global.MsDestructo);
					Wait Until(Is On Ground(Global.MsDestructo), True);
					Skip If(Is On Ground(Global.MsDestructo) && Distance Between(Global.MsDestructo, Global.A[Global.MsDestructo.checkpoint_current])
						<= 1.400, 5);
				End;
				Enable Inspector Recording;
				Log To Inspector(Custom String("Fail {0}", Global.MsDestructo.checkpoint_current));
				Disable Inspector Recording;
			End;
		End;
		Destroy Dummy Bot(Team Of(Global.MsDestructo), Slot Of(Global.MsDestructo));
		Global.MsDestructo = Null;
		Enable Inspector Recording;
		Log To Inspector(Custom String("■ Map Check Complete ■"));
		Disable Inspector Recording;
	}
}

rule("Addon | SUB 3rd Person Camera")
{
	event
	{
		Subroutine;
		Addon3rdPerson;
	}

	actions
	{
		If(Event Player.addon_toggle3rdPov);
			Start Camera(Event Player, Update Every Frame(Ray Cast Hit Position(0.500 * Up + Eye Position(Event Player),
				0.500 * Up + Eye Position(Event Player) + -3.500 * Facing Direction Of(Event Player), Empty Array, Empty Array, False)
				+ 0.500 * Facing Direction Of(Event Player)), Update Every Frame(0.500 * Up + Eye Position(Event Player)), False);
		Else;
			Stop Camera(Event Player);
		End;
	}
}

rule("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("<tx0C000000000207B5><fgFFFF00FF> Map Data & Addon Settings Are On Page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入")
{
	event
	{
		Ongoing - Global;
	}
}

rule("<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Wait(False, Ignore Condition);
		"Filling this in adds it to the inspector pasta after next restart.\nYou can fill in again to overwrite.\n修改的内容 在重新开始 比赛后生效\n您可以反复 修改字符串 中的内容"
		Global.Name = Custom String("name here - 作者");
		Global.Code = Custom String("code here - 代码");
		"+++++  +++++  +++++  +++++  +++++  +++++\ncolor customization below / 自定义 颜色(实体、HUD)\n+++++  +++++  +++++  +++++  +++++  +++++\n\ncredit hud name   -   作者HUD"
		Global.ColorConfig[False] = Color(Violet);
		"credit hud code   -   代码HUD"
		Global.ColorConfig[True] = Color(Sky Blue);
		"dsc.gg/genjiparkour"
		Global.ColorConfig[18] = Color(Aqua);
		"server time hud   -   房间倒计时"
		Global.ColorConfig[2] = Color(Red);
		"time  hud   -   单关用时HUD"
		Global.ColorConfig[3] = Color(White);
		"level hud   -   关卡HUD"
		Global.ColorConfig[4] = Color(White);
		"command hud   -   指令HUD"
		Global.ColorConfig[5] = Color(White);
		"command hud highlight   -   指令HUD高亮"
		Global.ColorConfig[6] = Color(Green);
		"bhop/climb available   -   小跳/爬墙未用HUD"
		Global.ColorConfig[7] = Color(Green);
		"bhop/climb used (cant be same as available)   -   小跳/爬墙已用HUD"
		Global.ColorConfig[8] = Color(Red);
		"current checkpoint ring   -   当前检查点光圈"
		Global.ColorConfig[9] = Color(Sky Blue);
		"next checkpoint ring   -   下一关检查点光圈"
		Global.ColorConfig[10] = Color(Lime Green);
		"next checkpoint light shaft   -   下一关检查点光柱"
		Global.ColorConfig[11] = Color(White);
		"next checkpoint icon   -   下一关检查点图标"
		Global.ColorConfig[12] = Color(Sky Blue);
		"\"come here\" text   -   到这里来\" 文本"
		Global.ColorConfig[13] = Color(White);
		"kill orbs   -   击杀球"
		Global.ColorConfig[14] = Color(Blue);
		"normal orbs   -   弹球"
		Global.ColorConfig[15] = Color(Green);
		"lock orbs (overwritten if its same as normal)\n收集球 (与普通弹 球相同时将 自动覆写)"
		Global.ColorConfig[16] = Color(Orange);
		"portals   -   自定义 传送门"
		Global.ColorConfig[17] = Color(White);
	}
}

rule("Instructions for Depricated Rules (ban / portal / dash /ult) - 旧版编辑器中已弃用规则指引 (单关封禁 / 传送门 / 给刀给S)")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"The following rules should now be handled with the ingame editor\n- Ban per checkpoint\n- Dash/Ult per checkpoint\n- Custom portals"
		Abort;
		"When updating old maps, these things should be added to your map data.\nThis is done with the instructions below"
		Abort;
		"step 1) Open the old rule\nstep 2) Select the variables and press copy\n(do not select waits or workshop toggles, only select variables)\nstep 3) Go to map data rule and paste this the variables"
		Abort;
		"以下规则现在 要用游戏内置 编辑器编辑\n- 单关 封禁(卡小、蹭留等)\n- 检查点给 刀给S\n- 自定义 传送门"
		Abort;
		"当更新旧 图数据 时，以上 这些东西 应该放 到地图 数据里\n以下是一 些更新旧 图数据 指引:"
		Abort;
		"步骤 1) 找到旧图 数据的 规则\n步骤 2) 选中旧图 数据的 全局变 量并复制\n(不要复制含 等待 地图工坊设置 的指令, 只要 全局变量 的数据)\n步骤 3) 将全局变 量数据粘 贴到新版 编辑器的 地图数 据规则"
		Abort;
	}
}

rule("<tx0C00000000001344> Addons Settings & Data - 附加组件 <tx0C00000000001344>")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Addon | Comp Mode instruction message - 竞赛模式指引消息 <---- INSERT HERE / 在这输入")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Wait(0.400, Ignore Condition);
		"Instructions that show when you start comp mode.\nDue to the hud text limit, you there is 4 huds available.\nIf you dont need a field just empty the textfield."
		Abort;
		"竞赛模式 指引消息\n指引消息将 会在竞赛模 式开始时 显示\n由于 hud 文本限制，你有 4 个hud可用\n如果你不需 要一个字段 只是空文 本字段"
		Global.instructiontext = Array(Custom String("Change in Comp Mode instruction message hud 1"), Custom String(
			"Change in Comp Mode instruction message hud 2"), Custom String("Change in Comp Mode instruction message hud 3"),
			Custom String("Change in Comp Mode instruction message hud 4"));
	}
}

disabled rule("Addon | Custom difficulty hud  - 自定义难度hud <---- INSERT HERE / 在这输入")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"1) workshop settings > difficulty > set to \"dont display\"\n2) enable this rule\n3) type your difficulty in the hud below"
		Wait(2.500, Ignore Condition);
		"1) 地图工坊设 置难度改为 “不显示”\n2) 勾选此规则 点击上方的 开启/关闭 开启此规则\n3) 修改下面的 创建hud文本 中的“enter custom difficulty here”"
		Create HUD Text(First Of(True), Last Of(Global.Difficultyhud) ? (String("Oof") == Custom String("噢") ? Custom String("游戏测试")
			: Custom String("Playtest")) : Empty Array, Custom String("enter custom difficulty here"), Null, Top, -173, Color(Blue), Color(
			Green), Color(Blue), Visible To and String, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
	}
}

disabled rule("Addon | Title Data - 标题数据 <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"enable this rule and fill in the title data below.\n启用此规则 并填写下面 的标题数据"
		Wait(True, Ignore Condition);
		"checkpoint number\n每关数量"
		Global.TitleData[False] = Array(Null, 10, 20, 30, 40, 50);
		"title\n标题文本"
		Global.TitleData[True] = Array(Custom String("Bunny"), Custom String("Jumper"), Custom String("Ninja"), Custom String("Pro"),
			Custom String("Expert"), Custom String("Master"));
		"color\n颜色"
		Global.TitleData[2] = Array(Color(Lime Green), Color(White), Color(Yellow), Color(Orange), Color(Purple), Color(Red));
	}
}

disabled rule("Addon | Friend Title - 朋友称号 <---- DISPLAY MESSAGE HERE (ON PLAYER)")
{
	event
	{
		Player Joined Match;
		All;
		All;
	}

	actions
	{
		"\"your nickname\" your friends ingame name\n\"display title\" fill in the custom title\n修改字符串 \"your nickname <-------\" 为好友名字 区分大小写\n修改字符串 \"display title\" 为好友头顶 显示的称号"
		Wait Until(Has Spawned(Event Player), 999999995904.000);
		If(Custom String("your nickname <-------") == String Split(First Of(Event Player), Empty Array));
			Big Message(First Of(True), Custom String("Message to the whole room"));
			Create In-World Text(First Of(True), Custom String("display title"), Event Player, 1.500, Clip Against Surfaces,
				Visible To Position and String, Color(Orange), Default Visibility);
		End;
		If(Custom String("your nickname <-------") == String Split(First Of(Event Player), Empty Array));
			Big Message(First Of(True), Custom String("Message to the whole room"));
			Create In-World Text(First Of(True), Custom String("display title"), Event Player, 1.500, Clip Against Surfaces,
				Visible To Position and String, Color(Orange), Default Visibility);
		End;
		If(Custom String("your nickname <-------") == String Split(First Of(Event Player), Empty Array));
			Big Message(First Of(True), Custom String("Message to the whole room"));
			Create In-World Text(First Of(True), Custom String("display title"), Event Player, 1.500, Clip Against Surfaces,
				Visible To Position and String, Color(Orange), Default Visibility);
	}
}

disabled rule("Addon | Display Author Time - 展示世界纪录 <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"type your entry in the textfield that says \"name and time here\"\n在文本框 中输入“名称和时间”"
		Create HUD Text(First Of(True), Null, Custom String(" \n{0} author time {0}", Icon String(Fire)), Custom String(
			"name and time here"), Right, -142, Color(Rose), Color(Rose), Color(Rose), Visible To, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
	}
}

disabled rule("Addon | HUD text for certain Checkpoints - 特定关卡显示的HUD文本 <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"the example fill shows a text for cp 1 and cp 3\n示例已填写 关卡1和3 的hud文本"
		Wait(True, Ignore Condition);
		"in CpHudText fill in text\n修改字符串 “CpHudText” 为顶部显示 的hud文本"
		Global.CpHudText = Array(Custom String("text cp 1"), Custom String("text cp 3"));
		"in CpHudCp fill in the at wich to display\n修改数组 “CpHudCp” 为hud文本 显示的关卡"
		Global.CpHudCp = Array(1, 3);
	}
}

disabled rule("Addon | Inworld text for certain Checkpoints - 特定关卡显示的地图文本 <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"the example fill shows a text for cp 1 and cp 3\n示例已填写 关卡1和3 的地图文本"
		Wait(True, Ignore Condition);
		"in CpIwtText fill in text\n修改字符串 “CpIwtText” 为关卡显示 的地图文本"
		Global.CpIwtText = Array(Custom String("text cp 1"), Custom String("text cp 3"));
		"in CpIwtCp fill in cp at wich to display\n修改数组 “CpIwtCp” 为显示地图 文本的关卡"
		Global.CpIwtCp = Array(1, 3);
		"in CpIwtPos fill in the vector\n修改数组 “CpIwtPos” 为地图文本 的矢量位置"
		Global.CpIwtPos = Array(Vector(False, False, False), Vector(False, False, False));
		"color applies to all\n选择应用到 所有地图文 本的颜色"
		Global.CpIwtColor = Color(Lime Green);
	}
}

disabled rule("Addon | Hint text for certain Checkpoints - 特定关卡的提示文本 <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"the example fill shows a text for cp 1 and cp 3\n示例已填写 关卡1和3 的提示文本"
		Wait(True, Ignore Condition);
		"in HintText fill in text\n修改字符串 “HintText” 为关卡显示 的提示文本"
		Global.HintText = Array(Custom String("text cp 1"), Custom String("text cp 3"));
		"in HintCp fill in the at wich to display\n修改数组 “HintCp” 为提示文本 显示的关卡"
		Global.HintCp = Array(1, 3);
	}
}

disabled rule("Addon | 3rd Person Camera Mode - 第三人称")
{
	event
	{
		Player Joined Match;
		All;
		All;
	}

	actions
	{
		"Default 1st person: False\nDefault 3rd person: True"
		Event Player.addon_toggle3rdPov = True;
		Call Subroutine(Addon3rdPerson);
	}
}

rule("<tx0C00000000001344> Addons Skills - 附加组件技能 <tx0C00000000001344>")
{
	event
	{
		Ongoing - Global;
	}
}

disabled rule("Addon | Stall enhancer - 增强系統跳的判定")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Has Spawned(Event Player) == True;
		Vertical Speed Of(Event Player) >= -0.200;
		Vertical Speed Of(Event Player) <= 0.050;
		Horizontal Speed Of(Event Player) <= 1.300;
		Is In Air(Event Player) == True;
		Event Player.editor_on != False;
		Event Player.editor_fly == False;
	}

	actions
	{
		"@Condition createWorkshopSetting(bool, \"map settings \\n地图设置\",\" Autobounce enhancer - 增强系統跳的判定\", false, 3)"
		Wait(0.250, Abort When False);
		Start Forcing Player Position(Event Player, Position Of(Event Player), False);
		Wait Until(!Is Moving(Event Player), 1);
		Stop Forcing Player Position(Event Player);
		Set Move Speed(Event Player, False);
		Set Gravity(Event Player, False);
		"double jump catch"
		Wait Until(Is Button Held(Event Player, Button(Reload)) || Event Player.editor_fly || Is Dead(Event Player) || Is Using Ability 1(
			Event Player) || Speed Of(Event Player) > 3, 3);
		"wait(3)"
		Set Gravity(Event Player, 100);
		Set Move Speed(Event Player, 100);
		If(Is Alive(Event Player) && !(Event Player.editor_fly || Is Button Held(Event Player, Button(Reload))));
			Apply Impulse(Event Player, Up, 10, To World, Cancel Contrary Motion XYZ);
			Loop If Condition Is True;
	}
}

disabled rule("Addon | Fake Ledge Dash - 超级跳")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Using Ability 1(Event Player) == True;
	}

	actions
	{
		"climb / ledge > hold jump > hands on the ledge > dash  > wait for launch > release jump\n爬墙/扒 > 长按跳 > 抓住窗台 > SHIFT > 等待发射 > 释放跳跃"
		Event Player.addon_ledgeDash[False] = Null;
		Wait Until(Speed Of(Event Player) >= 45, 0.400);
		While(Is Using Ability 1(Event Player) && First Of(Event Player.addon_ledgeDash) <= 12);
			Event Player.addon_ledgeDash[True] = Facing Direction Of(Event Player);
			Event Player.addon_ledgeDash[2] = Speed Of(Event Player);
			"dashed into air or object = end"
			If(Speed Of(Event Player) < 45);
				Skip(11);
			Else;
				Event Player.addon_ledgeDash[False] += True;
			End;
			"stop storing, we keep this speed/direction"
			If(First Of(Event Player.addon_ledgeDash) == 12);
				"wait for dash to finish to execute"
				Wait Until(Speed Of(Event Player) < 40, 0.400);
			End;
			Wait(False, Ignore Condition);
		End;
		"and eventPlayer.addon_ledgeDash[0] <= 12: # ledge dash execute"
		If(First Of(Event Player.addon_ledgeDash) >= 5);
			Apply Impulse(Event Player, Event Player.addon_ledgeDash[True], Last Of(Event Player.addon_ledgeDash), To World,
				Cancel Contrary Motion XYZ);
		End;
		Event Player.addon_ledgeDash[False] = Null;
		Event Player.addon_ledgeDash[True] = Null;
		Event Player.addon_ledgeDash[2] = Null;
	}
}

disabled rule("Addon | Group up - Map Data")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"replace 777 with checkpoint number\nreplace vector 0,0,0 with orb position"
		Create In-World Text(Filtered Array(All Players(All Teams), Current Array Element.checkpoint_current == 777), Custom String(
			"{0} {1} {0}", Ability Icon String(Hero(Genji), Button(Ultimate)), String("Oof") == Custom String("噢") ? Custom String("待在这里")
			: Custom String("group up")), Null, 1.500, Do Not Clip, Visible To and String, Color(Orange), Default Visibility);
		"replace 777 with checkpoint number\nreplace vector 0,0,0 with orb position\n3.5 is the radius"
		Create Effect(Filtered Array(All Players(All Teams), Current Array Element.checkpoint_current == 777), Sphere, Color(Orange),
			Vector(False, False, False), 3.500, Visible To);
	}
}

disabled rule("Addon | Group Up")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		"replace 777 with checkpoint number"
		Event Player.checkpoint_current == 777;
		Is Alive(Event Player) == True;
		Is On Ground(Event Player) == False;
		Event Player.toggle_invincible == False;
		"replace vector 0,0,0 with orb position\n3.5 is the radius"
		Distance Between(Event Player, Vector(False, False, False)) < 3.500;
	}

	actions
	{
		Small Message(Event Player, Custom String("   stay in the bubble"));
		Wait(True, Abort When False);
		Small Message(Event Player, Custom String("   9"));
		Wait(True, Abort When False);
		Small Message(Event Player, Custom String("   8"));
		Wait(True, Abort When False);
		Small Message(Event Player, Custom String("   7"));
		Wait(True, Abort When False);
		Small Message(Event Player, Custom String("   6"));
		Wait(True, Abort When False);
		Small Message(Event Player, Custom String("   5"));
		Wait(True, Abort When False);
		Small Message(Event Player, Custom String("   4"));
		Wait(True, Abort When False);
		Small Message(Event Player, Custom String("   3"));
		Wait(True, Abort When False);
		Small Message(Event Player, Custom String("   2"));
		Wait(True, Abort When False);
		Small Message(Event Player, Custom String("   1"));
		Wait(True, Abort When False);
		Start Forcing Player Position(Event Player, Global.A[Event Player.checkpoint_current + True] + 0.100 * Up, False);
		Set Status(Event Player, Null, Rooted, 0.300);
		Wait(False, Ignore Condition);
		Stop Forcing Player Position(Event Player);
	}
}

disabled rule("Addon | Custom checkpoint loading or resetting")
{
	event
	{
		Subroutine;
		AddonCustomLoadAndReset;
	}

	actions
	{
		"This subroutine triggers on failing, arriving, resetting, skipping etc\nexample: reset gravity and movespeed after being changed by custom orbs"
		Set Gravity(Event Player, 100);
		Set Move Speed(Event Player, 100);
	}
}

disabled rule("Addon | Custom Orb Script")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		"don't edit this condition !!!!!!!!!!!!!!!!!"
		Event Player.cache_bounceTouched > -1;
	}

	actions
	{
		"Enable this rule and find the ID number of the bounce orbs via the editor display.\nNote that the ID can change if you place or delete orbs infront of that orb.\nDo NOT edit the next 2 actions."
		Event Player.addon_bounceId = First Of(Filtered Array(Mapped Array(Global.pinballnumber, Current Array Index),
			Global.pinballnumber[Current Array Element] == Event Player.checkpoint_current && Global.TQ[Current Array Element] == Event Player.cache_bouncePosition[Event Player.cache_bounceTouched]));
		"Add the desired ID numbers for the bounces in the array\nadd the script after it\nyou can use the trigger sub above this rule to reset the effects"
		If(Array Contains(Array(2), Event Player.addon_bounceId));
			"example gravity (should be reset to 100 in trigger on fail)"
			Set Gravity(Event Player, 25);
			Small Message(Event Player, Custom String(" you feel light"));
			Wait(2, Ignore Condition);
			Set Gravity(Event Player, 100);
		End;
		If(Array Contains(Array(2, 3), Event Player.addon_bounceId));
			"example canceling primary makes double jump recover"
			Cancel Primary Action(Event Player);
			Event Player.skill_usedDouble = Null;
			Small Message(Event Player, Custom String(" double jump recovered"));
		End;
		If(Array Contains(Array(4), Event Player.addon_bounceId));
			"example move speed"
			Set Move Speed(Event Player, 250);
			Small Message(Event Player, Custom String(" zooom"));
	}
}

disabled rule("Addon | Fake Triple Jump - 假三段跳")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		"Method D\nUpdated Script by LulledLion 9-1-24"
		Global.BanTriple == False;
		Is On Ground(Event Player) == False;
		"Double cannot be used already"
		Event Player.skill_usedDouble == False;
		"Don't trigger on reset"
		Is Button Held(Event Player, Button(Reload)) == False;
	}

	actions
	{
		"Enable checking double jump"
		Event Player.addon_enableDoubleChecks = True;
		Wait(False, Ignore Condition);
		Loop If Condition Is True;
		Abort If(Event Player.skill_usedDouble);
		"Input window to Triple"
		Wait Until((Is Jumping(Event Player) && Is Button Held(Event Player, Button(Jump))) || Is On Wall(Event Player)
			|| Is Using Ability 1(Event Player) || Is Button Held(Event Player, Button(Reload)), 0.048);
		"Cancel Triple"
		Abort If(Is On Wall(Event Player) || Is Using Ability 1(Event Player) || Is Button Held(Event Player, Button(Reload))
			|| Has Status(Event Player, Rooted));
		"Apply fake triple jump"
		If(Is Button Held(Event Player, Button(Jump)) && Is Jumping(Event Player));
			Apply Impulse(Event Player, Up, 9, To World, Cancel Contrary Motion XYZ);
	}
}

`
}