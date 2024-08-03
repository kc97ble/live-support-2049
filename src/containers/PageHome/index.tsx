import React from "react";
import styles from "./index.module.scss";
import cx from "clsx";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function PageHome({ className, style }: Props) {
  return (
    <main className={cx(styles.container, className)} style={style}>
      <p>
        {
          "Đây là trang để giải đáp các câu hỏi trong giờ thực hành. Có hai cách để yêu cầu hỗ trợ:"
        }
      </p>
      <p>
        <strong>{"Cách 1 (trực tiếp):"}</strong>
        <span>{" Gửi câu hỏi trong trang "}</span>
        <a href="/q">{"Đặt câu hỏi"}</a>
        <span>{" rồi theo dõi trang "}</span>
        <a href="/t">{"Danh sách câu hỏi"}</a>
        <span>{"."}</span>
      </p>
      <p>
        <strong>{"Cách 2 (gián tiếp):"}</strong>
        <span>
          {
            " Giơ tay để yêu cầu sự trợ giúp từ tình nguyện viên được gán cho bạn."
          }
        </span>
      </p>
      <p>
        <em>{"Lưu ý:"}</em>
        <span>
          {
            " Ưu tiên dùng cách 1 để có câu trả lời nhanh hơn. Cách 2 thường sẽ lâu hơn do tình nguyện viên thường không thể trả lời ngay lập tức, mà phải chuyển câu hỏi cho giáo viên."
          }
        </span>
      </p>
    </main>
  );
}
