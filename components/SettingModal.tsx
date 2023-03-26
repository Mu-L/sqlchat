import { useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
import ClearDataConfirmModal from "./ClearDataConfirmModal";

interface Props {
  show: boolean;
  close: () => void;
}

interface State {
  showClearDataConfirmModal: boolean;
}

const SettingModal = (props: Props) => {
  const { show, close } = props;
  const [state, setState] = useState<State>({
    showClearDataConfirmModal: false,
  });

  const toggleClearDataConfirmModal = (show = true) => {
    setState({
      ...state,
      showClearDataConfirmModal: show,
    });
  };

  return (
    <>
      <div className={`modal modal-middle ${show && "modal-open"}`}>
        <div className="modal-box relative">
          <h3 className="font-bold text-lg">Setting</h3>
          <button className="btn btn-sm btn-circle absolute right-4 top-4" onClick={close}>
            <Icon.IoMdClose className="w-5 h-auto" />
          </button>
          <div className="w-full flex flex-col justify-start items-start space-y-3 pt-4">
            <h3>Danger Zone</h3>
            <div className="w-full border border-red-200 p-4 rounded-lg">
              <div className="w-full flex flex-row justify-between items-center gap-2">
                <div>
                  <h4 className="leading-8">Clear all data</h4>
                  <p className="text-gray-500 text-sm">SQLChat saves all of your data in localstorage. Please be sure to clear data.</p>
                </div>
                <button className="btn btn-error btn-sm" onClick={() => toggleClearDataConfirmModal(true)}>
                  Clear data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {state.showClearDataConfirmModal &&
        createPortal(<ClearDataConfirmModal close={() => toggleClearDataConfirmModal(false)} />, document.body)}
    </>
  );
};

export default SettingModal;