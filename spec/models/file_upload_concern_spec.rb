require 'rails_helper'

class Dummy
  include FileUploadConcern
  upload :foo, :bar

  def bar= value
  end
end

RSpec.describe FileUploadConcern do
  subject { Dummy.new }

  context "define method via .upload" do
    it { is_expected.to be_respond_to("foo=") }

    context "when call foo=" do
      let(:uploader) { double("FileUploader") }
      let(:uploaded_file) { "uploaded file" }

      before do
        allow(FileUploader).to receive(:create).
          and_return(uploader)
      end

      it "should save uploaded file" do
        expect(uploader).to receive(:save).with "file1"
        subject.foo = "file1"
      end

      it "should send bar= with uploaded_file" do
        allow(uploader).to receive(:save).and_yield uploaded_file
        expect(subject).to receive(:bar=).with uploaded_file
        subject.foo = "file1"
      end
    end
  end

end
