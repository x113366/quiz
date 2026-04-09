import React, { useState, useEffect } from 'react';
import './QuizManager.css';

// 导入原始题库数据
import { categories as originalCategories, questions as originalQuestions } from '../data/questions';

export default function QuizManager() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState({});
  const [uploadStatus, setUploadStatus] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // 初始化数据，优先使用本地存储的数据
  useEffect(() => {
    const savedCategories = localStorage.getItem('quizCategories');
    const savedQuestions = localStorage.getItem('quizQuestions');

    if (savedCategories && savedQuestions) {
      setCategories(JSON.parse(savedCategories));
      setQuestions(JSON.parse(savedQuestions));
    } else {
      // 如果没有保存的数据，使用原始数据
      setCategories(originalCategories);
      setQuestions(originalQuestions);
      // 保存到本地存储
      localStorage.setItem('quizCategories', JSON.stringify(originalCategories));
      localStorage.setItem('quizQuestions', JSON.stringify(originalQuestions));
    }
  }, []);

  // 处理文件上传
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);

        // 验证数据格式
        if (!importedData.categories || !importedData.questions) {
          throw new Error('文件格式不正确，缺少categories或questions字段');
        }

        // 合并数据
        const updatedCategories = [...categories];
        const updatedQuestions = { ...questions };

        // 处理新分类
        importedData.categories.forEach(newCategory => {
          // 为分类添加默认值
          const processedCategory = {
            id: newCategory.id || `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: newCategory.name || '未命名分类',
            description: newCategory.description || '暂无描述',
            icon: newCategory.icon || '📝',
            color: newCategory.color || '#666666',
            ...newCategory
          };

          const existingIndex = updatedCategories.findIndex(cat => cat.id === processedCategory.id);
          if (existingIndex === -1) {
            updatedCategories.push(processedCategory);
          } else {
            updatedCategories[existingIndex] = processedCategory;
          }
        });

        // 处理新题目
        Object.keys(importedData.questions).forEach(categoryId => {
          updatedQuestions[categoryId] = importedData.questions[categoryId].map((question, index) => ({
            // 为题目添加默认值
            id: question.id || `${categoryId}_${index + 1}`,
            question: question.question || '暂无问题',
            options: question.options || {
              a: '选项A',
              b: '选项B',
              c: '选项C',
              d: '选项D'
            },
            correctAnswer: question.correctAnswer || Object.keys(question.options || {a: '选项A'})[0],
            explanation: question.explanation || '暂无解释',
            ...question
          }));
        });

        // 更新状态并保存
        setCategories(updatedCategories);
        setQuestions(updatedQuestions);
        localStorage.setItem('quizCategories', JSON.stringify(updatedCategories));
        localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
        setUploadStatus('题库上传成功！');

        // 3秒后清除状态
        setTimeout(() => setUploadStatus(''), 3000);
      } catch (error) {
        setUploadStatus(`上传失败：${error.message}`);
        setTimeout(() => setUploadStatus(''), 3000);
      }
    };
    reader.readAsText(file);
  };

  // 处理分类删除
  const handleDeleteCategory = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowConfirmModal(true);
  };

  // 确认删除
  const confirmDelete = () => {
    if (categoryToDelete) {
      const updatedCategories = categories.filter(cat => cat.id !== categoryToDelete);
      const updatedQuestions = { ...questions };
      delete updatedQuestions[categoryToDelete];

      setCategories(updatedCategories);
      setQuestions(updatedQuestions);
      localStorage.setItem('quizCategories', JSON.stringify(updatedCategories));
      localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
      setShowConfirmModal(false);
      setCategoryToDelete(null);
    }
  };

  // 取消删除
  const cancelDelete = () => {
    setShowConfirmModal(false);
    setCategoryToDelete(null);
  };

  // 导出题库
  const handleExport = () => {
    const exportData = {
      categories,
      questions
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="quiz-manager">
      <h1>题库管理</h1>
      
      {/* 上传区域 */}
      <div className="upload-section">
        <h2>上传题库</h2>
        <p>请上传包含 categories 和 questions 字段的 JSON 文件</p>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="file-input"
        />
        {uploadStatus && (
          <div className={`upload-status ${uploadStatus.includes('失败') ? 'error' : 'success'}`}>
            {uploadStatus}
          </div>
        )}
      </div>

      {/* 导出区域 */}
      <div className="export-section">
        <button onClick={handleExport} className="export-button">
          导出题库
        </button>
      </div>

      {/* 题库列表 */}
      <div className="categories-list">
        <h2>现有题库</h2>
        {categories.length === 0 ? (
          <p>暂无题库，请上传题库文件</p>
        ) : (
          <ul>
            {categories.map(category => (
              <li key={category.id} className="category-item">
                <div className="category-info">
                  <span className="category-icon">{category.icon}</span>
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <p className="question-count">
                      题目数量：{questions[category.id]?.length || 0}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="delete-button"
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 确认删除模态框 */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>确认删除</h3>
            <p>确定要删除这个题库吗？此操作不可恢复。</p>
            <div className="modal-buttons">
              <button onClick={cancelDelete} className="cancel-button">
                取消
              </button>
              <button onClick={confirmDelete} className="confirm-button">
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}