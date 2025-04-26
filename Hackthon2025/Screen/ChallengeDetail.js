import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';  // Import the dropdown picker

export default function ChallengeDetail({ navigation }) {
    const opponents = ['Opponent 1', 'Opponent 2', 'Opponent 3', 'Opponent 4'];
    const judges = ['Judge A', 'Judge B', 'Judge C'];
    const [open, setOpen] = useState(false); // 控制下拉框是否打开
    const [openJ, setOpenJ] = useState(false); //  for judge
    const [selectedOpponent, setSelectedOpponent] = useState(opponents[0]); // Default to the first opponent
    const [selectedJudge, setSelectedJudge] = useState(judges[0]); // Default to the first judge

    const handleConfirm = () => {
        alert(`You selected ${selectedOpponent} as your opponent and ${selectedJudge} as your judge.`);
        // navigation.navigate('NextPage');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Let's go!</Text>

            <View style={styles.selectionBlock}>
                <Text style={styles.label}>Select Opponent:</Text>
                <View style={styles.selectWrapper}>
                    <DropDownPicker
                        open={open} // 控制是否打开下拉框
                        value={selectedOpponent} // 当前选中的对手
                        items={opponents.map(opponent => ({
                            label: opponent,
                            value: opponent,
                        }))} // 转换对手列表为 DropDownPicker 可用项
                        setValue={setSelectedOpponent} // 设置选中的对手
                        setOpen={setOpen} // 设置 open 状态（点击时控制下拉框打开/关闭）
                        containerStyle={styles.selectContainer}
                        style={styles.select}
                        dropDownStyle={styles.dropDown}
                        dropDownMaxHeight={150} // 控制下拉框的最大高度
                        visibleItemCount={5} // 可见的项数为 5
                        placeholder="Select an opponent" // 提示文字
                        showArrowIcon={true} // 显示箭头图标
                        zIndex={1000} // 防止被遮挡
                        onChangeItem={() => setOpen(false)} // 选项变化时关闭下拉框
                    />
                </View>
            </View>



            {/* Judge Selection */}
            <View style={styles.selectionBlock}>
                <Text style={styles.label}>Select Judge:</Text>
                <View style={styles.selectWrapper}>
                    <DropDownPicker
                        open={openJ} // 控制是否打开下拉框
                        value={selectedJudge} // 当前选中的法官
                        items={judges.map(judge => ({
                            label: judge,
                            value: judge,
                        }))} // 转换法官列表为 DropDownPicker 可用项
                        setValue={setSelectedJudge} // 设置选中的法官
                        setOpen={setOpenJ} // 设置 open 状态（点击时控制下拉框打开/关闭）
                        containerStyle={styles.selectContainer}
                        style={styles.select}
                        dropDownStyle={styles.dropDown}
                        dropDownMaxHeight={150} // 控制下拉框的最大高度
                        visibleItemCount={5} // 可见的项数为 5
                        placeholder="Select a judge" // 提示文字
                        showArrowIcon={true} // 显示箭头图标
                        zIndex={1000} // 防止被遮挡
                        onChangeItem={() => setOpenJ(false)} // 选项变化时关闭下拉框
                    />
                </View>
            </View>


            {/* Confirm Button */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60, // Extra space at the top
        backgroundColor: '#FFE5B4',
    },
    title: {
        marginTop: 20,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#D2691E',
        textAlign: 'center',
        marginBottom: 50, // Larger margin below the title
    },
    selectionBlock: {
        marginBottom: 100, // Larger space between each selection block
    },
    label: {
        fontSize: 20,
        color: '#8B4513',
        marginBottom: 12,
        marginLeft: 5,
    },
    selectWrapper: {
        borderWidth: 1,
        borderColor: '#D2691E',
        borderRadius: 12,
        backgroundColor: '#FFF8F0',
        justifyContent: 'center', // Ensure that content is centered
        alignItems: 'center', // Ensure that content is centered
        height: 50, // Ensure the height is sufficient to accommodate the dropdown
    },
    selectContainer: {
        height: 50,
        width: '100%',
    },
    select: {
        height: 50,
        width: '100%',
        color: '#8B4513',
        borderRadius: 8,
    },
    dropDown: {
        backgroundColor: '#FFF8F0',
        borderRadius: 8,
    },
    confirmButton: {
        marginTop: 50,
        backgroundColor: '#FFDAB9',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
    },
    confirmText: {
        fontSize: 22,
        color: '#8B4513',
        fontWeight: 'bold',
    },
});